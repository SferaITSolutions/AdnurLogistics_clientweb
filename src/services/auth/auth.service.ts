import { axiosInstace, axiosWithAuth } from "@/api/interceptors";
import { LoginSchemaType } from "@/shared/schemas/loginSchema";
import { RegisterSchemaType } from "@/shared/schemas/registerSchema";
import { IForeignRegisterData } from "@/shared/types/auth";

export const authService = {
  async login(data: LoginSchemaType) {
    const response = await axiosInstace.post("/auth/login", data);
    return response;
  },

  async refresh() {
    const response = await axiosInstace.post("/auth/login");
    return response;
  },

  async logout() {
    const response = await axiosInstace.post("/token/delete/");

    return response;
  },

  async foreignRegister(data: IForeignRegisterData) {
    const response = await axiosWithAuth.post("/register/", data);

    return response;
  },

  async register(data: RegisterSchemaType) {
    const response = await axiosWithAuth.post("/register/", data);

    return response;
  },

  async registerComunityMember(data: ComunityMemberRegisterSchema) {
    const response = await axiosWithAuth.patch("/comunity_member/", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response;
  },

  async verifyEmail(email: string, code: string) {
    const res = await axiosWithAuth.post("/verify/", { code, email });

    return res;
  },

  async requestResetPassword(email: string) {
    const res = await axiosWithAuth.post("/reset-password/send-link/", {
      email,
    });

    return res;
  },

  async resetPassword(token: string, password: string) {
    const res = await axiosWithAuth.post("/reset-password/", {
      token,
      password,
    });

    return res;
  },

  async sendVerificationCode(email: string) {
    const res = await axiosWithAuth.post("/verify/send-code/", { email });

    return res;
  },
};
