import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { message } from "antd";
import { signinSchema } from "../schema/user";
import { login } from "../api/user";

const Login = () => {
  const navigate = useNavigate();
  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await login(values);
        console.log(res);
        if (res.data.user.name === "admin") {
          return navigate("/admin");
        }
        message.success("Đăng nhập thành công!");
        navigate("/");
      } catch (error) {
        message.destroy("Thất bại!");
      }
    },
  });

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://wac-cdn.atlassian.com/dam/jcr:48f73fa9-325e-4663-a743-daba2a0f1397/jira-social%20@2x.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>

          <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label className="font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="p-2 border-2 border-gray-500 rounded outline-none"
                placeholder="Nhập email.."
              />
              {errors.email && touched.email && (
                <p className="text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold">Password</label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="p-2 border-2 border-gray-500 rounded outline-none"
                placeholder="Nhập password.."
              />
              {errors.password && touched.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
            <p className="mt-3">
              Need an account?{" "}
              <Link
                to={"/register"}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Create an account
              </Link>
            </p>
            <button
              type="submit"
              className="p-2 text-white bg-blue-500 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
