import React, { useEffect, useState } from "react";

type FormDataT={
    username: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    inviteCode: string;
}


export default function SignupForm() {
    const [formData, setFormData] = useState<FormDataT>({
        username: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        inviteCode: "",
      });

      const [isValid, setIsValid]=useState(false);
      


      useEffect(() => {
        const formStatus = validForm(formData)
        setIsValid(formStatus)

      }, [formData])
      
  return <div>



  </div>;
}


//**UTILITY FN */

const validForm(form:FormDataT):boolean{

    const errors:string[] = []


    if(form.email !== form.confirmEmail){
        errors.push('emails do not match')
    }


    if(form.password !== form.confirmPassword){
        errors.push('passwords do not match')
    }


    if(form.inviteCode.length < 3){
        errors.push('invite must be included')
    }

    


    if(errors.length > 0)return false;

}