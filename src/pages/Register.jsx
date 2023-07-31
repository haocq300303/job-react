import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { message } from "antd";
import { v4 as uuidv4 } from "uuid";
import { userSchema } from "../schema/user";
import { register } from "../api/user";

const Login = () => {
  const navigate = useNavigate();
  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      id: "",
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      console.log(values);
      const { confirm_password, ...othersValue } = values;
      const formatValues = {
        ...othersValue,
        id: uuidv4(),
      };
      try {
        await register(formatValues);
        message.success("Đăng ký thành công!");
        return navigate("/login");
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
              <label className="font-bold">Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                className="p-2 border-2 border-gray-500 rounded outline-none"
                placeholder="Nhập tên.."
              />
              {errors.name && touched.name && (
                <p className="text-red-500">{errors.name}</p>
              )}
            </div>
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
            <div className="flex flex-col gap-2">
              <label className="font-bold">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                className="p-2 border-2 border-gray-500 rounded outline-none"
                placeholder="Nhập lại password.."
              />
              {errors.confirm_password && touched.confirm_password && (
                <p className="text-red-500">{errors.confirm_password}</p>
              )}
            </div>
            <p className="mt-3">
              Do you already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Log in to your account
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
