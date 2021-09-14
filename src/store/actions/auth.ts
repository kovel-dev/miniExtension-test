import { FieldSet } from 'airtable';
import { AppDispatch, AppThunk } from '..';
import { actions as authActions } from '../slices/auth';
import airtableBase from '../../api/SetupAirtable';
import { Auth } from '../../utils/resources/auth';

const getStudentNames = (
  students: FieldSet[keyof FieldSet],
  dispatch: AppDispatch,
) => new Promise<FieldSet[keyof FieldSet][]>((resolve) => {
  const studentArray: FieldSet[keyof FieldSet][] = [];

  if (students instanceof Array) {
    const query = `OR(${students
      .map((id) => `RECORD_ID()='${id}'`)
      .join(',')})`;
    airtableBase('Students')
      .select({ filterByFormula: query })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach((record) => {
            const studentName: FieldSet[keyof FieldSet] = record.get('Name');

            studentArray?.push(studentName);
          });

          fetchNextPage();
        },
        (error) => {
          if (error) {
            dispatch(
              authActions.showErrors({
                errorMessage: error.message,
              }),
            );
          }

          resolve(studentArray);
        },
      );
  }
});

const setSession = (studentName: string) => {
  if (studentName) {
    localStorage.setItem('studentName', studentName);
  } else {
    localStorage.removeItem('studentName');
  }
};

async function asyncForEach(array: Auth[], callback: Function) {
  for (let i = 0; i < array.length; i += 1) {
    /* eslint-disable no-await-in-loop */
    await callback(array[i], i, array);
    /* eslint-enable no-await-in-loop */
  }
}

export const login = (studentName: string): AppThunk => async (dispatch: AppDispatch) => {
  airtableBase('Students')
    .select({
      filterByFormula: `Name = '${studentName}'`,
    })
    .firstPage((error, records) => {
      if (error) {
        dispatch(
          authActions.showErrors({
            errorMessage: error.message,
          }),
        );
      }

      if (!records || !records.length) {
        dispatch(
          authActions.showErrors({
            errorMessage: 'The provided name is not exist.',
          }),
        );
        return;
      }

      const { fields } = records[0];
      const classes = fields.Classes;

      // Set Session
      setSession(studentName);
      dispatch(authActions.startLoading());

      const classArray: Auth[] = [];
      if (classes instanceof Array) {
        const query = `OR(${classes
          .map((value) => `RECORD_ID()='${value}'`)
          .join(',')})`;
        airtableBase('Classes')
          .select({ filterByFormula: query })
          .eachPage(
            (records1, fetchNextPage) => {
              records1.forEach((record, index) => {
                const classData: Auth = {
                  id: index,
                  name: record.get('Name'),
                  students: record.get('Students'),
                  studentName: [],
                };

                classArray.push(classData);
              });

              fetchNextPage();
            },
            (error1) => {
              if (error1) {
                dispatch(
                  authActions.showErrors({
                    errorMessage: error1.message,
                  }),
                );
              }

              const start = async () => {
                await asyncForEach(
                  classArray,
                  async (item: Auth, index: number) => {
                    const students: FieldSet[keyof FieldSet][] = await getStudentNames( //eslint-disable-line
                      item.students,
                      dispatch,
                    );
                    classArray[index].studentName = students;
                  },
                );

                dispatch(
                  authActions.login({
                    isAuthenticated: true,
                    user: classArray,
                  }),
                );
              };

              start();
            },
          );
      }
    });
};

export const logout = () => async (dispatch: AppDispatch) => {
  localStorage.removeItem('studentName');
  dispatch(
    authActions.getInitialize({
      isLoading: false,
      isAuthenticated: false,
      user: null,
    }),
  );
};

export function getInitialize() {
  return async (dispatch: AppDispatch) => {
    dispatch(authActions.startLoading());

    try {
      const studentName = window.localStorage.getItem('studentName');

      if (studentName && studentName !== '') {
        setSession(studentName);

        dispatch(login(studentName));
      } else {
        dispatch(
          authActions.getInitialize({
            isLoading: false,
            isAuthenticated: false,
            user: null,
          }),
        );
      }
    } catch (error) {
      dispatch(
        authActions.getInitialize({
          isLoading: false,
          isAuthenticated: false,
          user: null,
        }),
      );
    }
  };
}
