const Register = () => {
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
  };
  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">create an Account</h2>
    </form>
  );
};

export default Register;
