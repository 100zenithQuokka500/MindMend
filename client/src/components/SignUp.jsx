import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from 'react-toastify';
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [role, setRole] = useState("");
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const onSubmit =async (data) => {
  //   if (!role) {
  //     toast.warn("You need to select either Patient or Provider");
  //     return;
  //   }
  //   setIsSubmitting(true);
  //   try {
  //     const response = await fetch("http://localhost:3000/api/signup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ ...data, role }),
  //     });

  //     const contentType = response.headers.get("content-type");
  //     let result;

  //     if (contentType && contentType.includes("application/json")) {
  //       result = await response.json();
  //     } else {
  //       result = await response.text();
  //     }

  //     if (response.ok) {
  //       toast.success(result.message || result || "Signup successful");
  //     } else {
  //       toast.error(result.error || result || "Signup failed");
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //     console.log("Error:", error.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const {registerUser  , isLoading , isError} = useAuth();
  const onSubmit = async(data)=>{
    if(!role){
      toast.warn("You need to select either Patient or Provider");
      return;
    }
    const response = await registerUser(data);
    if(response.data){
      console.log("response from signup-Page! " , response);
      toast.success(response?.message || response || "Signup successful");
    }
    toast.error(isError || "signup failed! ");
  }
  return (
    <form className="max-w-md mx-auto p-10 bg-white m-10 shadow-lg rounded-lg" onSubmit={handleSubmit(onSubmit)} action="POST">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
      <div className="mb-4">
        <input
          {...register("firstname", {
            required: { value: true, message: "This field is required" },
            minLength: { value: 3, message: "Minimum Length is 3" },
            maxLength: { value: 8, message: "Maximum Length is 8" },
          })}
          type="text"
          placeholder="First Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.firstname && <div className="text-red-500 mt-1">{errors.firstname.message}</div>}
      </div>
      <div className="mb-4">
        <input
          {...register("lastname", {
            required: { value: true, message: "This field is required" },
            minLength: { value: 3, message: "Minimum Length is 3" },
            maxLength: { value: 10, message: "Maximum Length is 10" },
          })}
          type="text"
          placeholder="Last Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.lastname && <div className="text-red-500 mt-1">{errors.lastname.message}</div>}
      </div>
      <div className="mb-4">
        <input
          {...register("email", {
            required: { value: true, message: "This field is required" },
          })}
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.email && <div className="text-red-500 mt-1">{errors.email.message}</div>}
      </div>
      <div className="passwords mb-4">
        <div className="mb-4">
          <input
            {...register("password", {
              required: { value: true, message: "This field is required" },
              // minLength: { value: 6, message: "Minimum Length is 6" },
              // maxLength: { value: 10, message: "Maximum Length is 10" },
              // pattern: {
              //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
              //   message: "Password must contain one uppercase, one lowercase, one number, and one special character"},
            })}
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.password && <div className="text-red-500 mt-1">{errors.password.message}</div>}
        </div>
        <div className="mb-4">
          <input
            {...register("confirmPassword", {
              required: { value: true, message: "This field is required" },
              validate: (value) => value === watch("password") || "Passwords do not match",
            })}
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.confirmPassword && <div className="text-red-500 mt-1">{errors.confirmPassword.message}</div>}
        </div>
      </div>
      <p className="mb-2">I am a</p>
      <div className="chose flex space-x-4 mb-4">
        <button
          type="button"
          className={`w-full py-2 rounded-lg ${role === "Patient" ? "bg-purple-600" : "bg-purple-500"} text-white hover:bg-purple-600`}
          onClick={() => setRole("Patient")}
        >
          Patient
        </button>
        <button
          type="button"
          className={`w-full py-2 rounded-lg ${role === "Provider" ? "bg-purple-600" : "bg-purple-500"} text-white hover:bg-purple-600`}
          onClick={() => setRole("Provider")}
        >
          Provider
        </button>
      </div>
      <div className="flex items-center mb-4">
        <input
          {...register("termsandconditions", {
            required: { value: true, message: "You need to agree to terms and conditions to proceed" },
          })}
          type="checkbox"
          className={`mr-2 form-check-input ${errors.termsandconditions ? 'is-invalid' : ''}`}
        />
        <p>I agree to the terms and conditions</p>
      </div>
      {errors.termsandconditions && <div className="text-red-500 mt-1">{errors.termsandconditions.message}</div>}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-600 transition duration-300"
      >
        {isLoading ? "Submitting..." : "Register"}
      </button>
      <p className="mt-4 text-center text-gray-600">By signing up, you agree to the Terms of Service</p>
    </form>
  );
};

export default SignUp;
