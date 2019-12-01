export function studentRegisterRequest(
  name,
  email,
  birth_date,
  height,
  weight
) {
  return {
    type: '@student/REGISTER_REQUEST',
    payload: { name, email, birth_date, height, weight },
  };
}

export function studentRegisterSuccess(student) {
  console.tron.log('action SUCCESS STUD');
  return {
    type: '@student/REGISTER_SUCCESS',
    payload: { student },
  };
}

export function studentRegisterFailure() {
  return {
    type: '@student/REGISTER_FAILURE',
  };
}
