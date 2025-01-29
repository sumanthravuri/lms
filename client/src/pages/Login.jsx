import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";

import { useNavigate } from "react-router-dom";
function Login() {
    const [signupInput,setSignupInput]=useState({name:"",email:"",password:""})
    const [loginInput,setLoginInput]=useState({email:"",password:""})
    const inputhandler=(e,type)=>{
        const{name,value}=e.target
        if(type=="signup"){
            setSignupInput({...signupInput,[name]:value})
        }
        else{
            setLoginInput({...loginInput,[name]:value})
        }
    }
    const [
      registerUser,
      {
        data: registerData,
        error: registerError,
        isLoading: registerIsLoading,
        isSuccess: registerIsSuccess,
      },
    ] = useRegisterUserMutation();
    const [
      loginUser,
      {
        data: loginData,
        error: loginError,
        isLoading: loginIsLoading,
        isSuccess: loginIsSuccess,
      },
    ] = useLoginUserMutation();
    const navigate = useNavigate();
    const handleRegistration = async (type) => {
      const inputData = type === "signup" ? signupInput : loginInput;
      const action = type === "signup" ? registerUser : loginUser;
      try {
        await action(inputData);
        console.log("Login Successful!");
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
        console.log(errorMessage);
      }
    };
    if(loginIsSuccess && loginData){
      navigate("/");
    }

    
  return (
    <div className="flex items-center w-full justify-center mt-20">
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Signup</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              Create a new account and click signup when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={signupInput.name}
                onChange={(e) => inputhandler(e, "signup")}
                placeholder="Eg. patel"
                required={true}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={signupInput.email}
                onChange={(e) => inputhandler(e, "signup")}
                placeholder="Eg. patel@gmail.com"
                required={true}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={signupInput.password}
                onChange={(e) => inputhandler(e, "signup")}
                placeholder="Eg. xyz"
                required={true}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={registerIsLoading}
              onClick={() => handleRegistration("signup")}
            >
              {registerIsLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                  wait
                </>
              ) : (
                "Signup"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Login your password here. After signup, you'll be logged in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={loginInput.email}
                onChange={(e) => inputhandler(e, "login")}
                placeholder="Eg. patel@gmail.com"
                required={true}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={loginInput.password}
                onChange={(e) => inputhandler(e, "login")}
                placeholder="Eg. xyz"
                required={true}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={loginIsLoading}
              onClick={() => handleRegistration("login")}
            >
              {loginIsLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                  wait
                </>
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
);
};
export default Login;