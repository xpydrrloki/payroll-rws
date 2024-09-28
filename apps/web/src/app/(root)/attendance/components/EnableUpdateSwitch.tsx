// import { Label } from '@/components/ui/label';
// import { Switch } from '@/components/ui/switch';
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import React, { Dispatch, FC, SetStateAction, useState } from 'react';
// import { useFormik } from 'formik';
// import { LoginValidationSchema } from '@/app/login/schemas/LoginValidationSchema';
// import useConfirmAuth from '@/hooks/api/auth/useConfirmAuth';
// import FormInput from '@/components/FormInput';

// interface EnableUpdateSwitchProps {
//   switchState: boolean;
//   setSwitchState: Dispatch<SetStateAction<boolean>>;
// }

// const EnableUpdateSwitch: FC<EnableUpdateSwitchProps> = ({
//   switchState,
//   setSwitchState,
// }) => {
//   const [openConfirmPass, setOpenConfirmPass] = useState<boolean>(false);
//   const { mutateAsync, error, isSuccess } = useConfirmAuth();

//   const handleSwitchChange = (checked: boolean) => {
//     if (checked) {
//       // When turning on, open the dialog
//       setOpenConfirmPass(true);
//     } else {
//       // When turning off, immediately update the switch state
//       setSwitchState(false);
//     }
//   };
//   const handleSaveChanges = () => {
//     setSwitchState(true); // Set the switch state to true when the dialog is confirmed
//     setOpenConfirmPass(false);
//   };

//   const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
//     useFormik({
//       initialValues: {
//         username: '',
//         password: '',
//       },
//       validationSchema: LoginValidationSchema,
//       onSubmit: async  (values) => {
//        await mutateAsync(values);
//         if (isSuccess) {
//           handleSaveChanges();
//         }
//       },
//     });

//     console.log(errors);

//   return (
//     <div className="flex gap-x-2 items-center px-2">
//       <Switch
//         id="enableUpdate"
//         checked={switchState}
//         onCheckedChange={handleSwitchChange} // Handle the switch change
//       />
//       <Label htmlFor="enableUpdate" className="w-40">
//         Aktifkan penggantian status
//       </Label>

//       <form onSubmit={handleSubmit}>
//         <Dialog open={openConfirmPass} onOpenChange={setOpenConfirmPass}>
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogHeader>
//               <DialogTitle>Konfirmasi Penggantian</DialogTitle>
//               <DialogDescription>
//                 Apakah Anda yakin ingin mengaktifkan penggantian status? Klik
//                 simpan untuk melanjutkan.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid w-full items-center gap-4">
//                 <FormInput
//                   name="username"
//                   label="Username"
//                   error={errors.username}
//                   isError={!!touched.username && !!errors.username}
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   placeholder="username"
//                   type="text"
//                   value={values.username}
//                 />

//                 <FormInput
//                   name="password"
//                   label="Password"
//                   error={errors.password}
//                   isError={!!touched.password && !!errors.password}
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   placeholder="password"
//                   type="password"
//                   value={values.password}
//                 />
//               </div>
//             </div>

//             <DialogFooter>
//               <Button
//                 type="submit"
//               >
//                 Save changes
//               </Button>
//               <Button variant="ghost" onClick={() => setOpenConfirmPass(false)}>
//                 Cancel
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </form>
//     </div>
//   );
// };

// export default EnableUpdateSwitch;
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useFormik } from 'formik';
import { LoginValidationSchema } from '@/app/login/schemas/LoginValidationSchema';
import useConfirmAuth from '@/hooks/api/auth/useConfirmAuth';
import FormInput from '@/components/FormInput';
import { normalizeDateToMidnight } from '@/helper/normalizeDate';

interface EnableUpdateSwitchProps {
  switchState: boolean;
  setSwitchState: Dispatch<SetStateAction<boolean>>;
  selectedDate: Date | undefined
}

const EnableUpdateSwitch: FC<EnableUpdateSwitchProps> = ({
  switchState,
  setSwitchState,
  selectedDate
}) => {
  const [openConfirmPass, setOpenConfirmPass] = useState<boolean>(false);

  // Hook for authentication mutation
  const { mutateAsync, isPending, error } = useConfirmAuth();

  // Function to update the switch state when dialog is confirmed
  const handleSaveChanges = () => {
    setSwitchState(true); // Set the switch state to true
    setOpenConfirmPass(false); // Close the dialog
  };

  // Handle switch change: If turning on, show the confirmation dialog
  const handleSwitchChange = (checked: boolean) => {
    if (checked) {
      setOpenConfirmPass(true);
    } else {
      setSwitchState(false); // Immediately disable if turning off
    }
  };

  // Form handling using Formik
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    values,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginValidationSchema,
    onSubmit: async (values) => {
      try {
        // Trigger the API request for authentication
        await mutateAsync(values);
        handleSaveChanges();
        resetForm();
      } catch {
        // Handle error cases if needed
      }
    },
  });

  const parsedDate = selectedDate
    ? new Date(normalizeDateToMidnight(selectedDate.toDateString()))
    : undefined;

  // Ensure selectedDate is properly compared
  const now = new Date(normalizeDateToMidnight(new Date().toISOString()));
  
  

  return (
    <div className="flex gap-x-2 items-center px-2" >
      <Switch
        id="enableUpdate"
        checked={switchState}
        onCheckedChange={handleSwitchChange} // Handle the switch change
        disabled={!parsedDate || parsedDate>=now}
        defaultChecked={false}
      />
      <Label htmlFor="enableUpdate" className="w-40">
        Aktifkan penggantian status
      </Label>

      <Dialog open={openConfirmPass} onOpenChange={setOpenConfirmPass}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi User</DialogTitle>
            <DialogDescription>
              Masukkan detail login Anda untuk mengaktifkan penggantian status.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid w-full items-center gap-4">
                <FormInput
                  name="username"
                  label="Username"
                  error={errors.username}
                  isError={!!touched.username && !!errors.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="username"
                  type="text"
                  value={values.username}
                />

                <FormInput
                  name="password"
                  label="Password"
                  error={errors.password}
                  isError={!!touched.password && !!errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="password"
                  type="password"
                  value={values.password}
                />
              </div>
              <Button
                type="submit"
                disabled={isPending} // Disable button while loading
              >
                {isPending ? 'Authenticating...' : 'Confirm'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setOpenConfirmPass(false);
                  setSwitchState(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnableUpdateSwitch;
