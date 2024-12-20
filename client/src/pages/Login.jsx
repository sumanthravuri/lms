import React, { useState } from "react";
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
function Login() {
    const [signupInput,setSignupInput]=useState({name:"",email:"",password:""})
    const [loginInput,setLoginInput]=useState({name:"",password:""})
    const inputhandler=(e,type)=>{
        const{name,value}=e.target
        if(type=="signup"){
            setSignupInput({...signupInput,[name]:value})
        }
        else{
            setLoginInput({...loginInput,[name]:value})
        }
    }
    const regData=(type)=>{
        const inputdata=type==="signup" ? signupInput : loginInput;
        console.log(inputdata)
    }
  return (
    <div className="flex items-center w-full justify-center">
    <Tabs defaultValue="signup" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Signup</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              please signup up for courses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name" >Username</Label>
              <Input type="text" name="name"  required={true} placeholder="username"onChange={(e)=>inputhandler(e,"signup")} value={signupInput.name} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input name="email" required={true} placeholder="ex.test@gmail.com" type="email"
              onChange={(e)=>inputhandler(e,"signup")} value={signupInput.email} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input name="password"  required={true} placeholder="ex.xyz" type="password" 
              onChange={(e)=>inputhandler(e,"signup")} value={signupInput.password}/>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={()=>regData("signup")}>Signup</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              login for ur courses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Username</Label>
              <Input name="name" type="text"  required={true} placeholder="username"
              onChange={(e)=>inputhandler(e,"login")} value={loginInput.name}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">passwoord</Label>
              <Input name="password" type="password"placeholder="password"required={true}
              onChange={(e)=>inputhandler(e,"login")} value={loginInput.password} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={()=>regData("login")}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
</div>
  )
}
  
  export default Login