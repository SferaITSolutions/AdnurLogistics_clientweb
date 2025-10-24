// ishlatilmagan ekan build error berdi...

// "use client";

// import { IProfile } from "../types";
// import { useEffect, useState } from "react";
// import { useAuthGlobal } from "@/context/AuthContext";

// export const useIsAuth = () => {
//   const [isAuth, setIsAuth] = useState<IProfile | null>(null);
//   const { isLoading, user, isSuccess } = useAuthGlobal()

//   // const { isLoading, data, isSuccess } = useQuery<IProfile>({
//   //   queryKey: ["profile"],
//   //   queryFn: (meta) => profileService.getProfile(meta),
//   //   retry: false,
//   // });

//   useEffect(() => {
//     if (isLoading) {
//       setIsAuth(null);
//     }
//     if (isSuccess) {
//       //@ts-ignore
//       setIsAuth(user);
//     }
//   }, [isLoading, user, isSuccess]);

//   return isAuth;
// };
