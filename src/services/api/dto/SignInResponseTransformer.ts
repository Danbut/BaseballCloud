/* eslint-disable camelcase */
export type SignInResponse = {
  data: {
    id: number;
    email: string;
    u_name: string | null;
    team_avatar: {
      url: string | null;
      size_100_100: {
        url: string | null;
      };
      size_40_40: {
        url: string | null;
      };
      size_32_32: {
        url: string | null;
      };
      size_20_20: {
        url: string | null;
      };
    };
    role: string;
    team_user: boolean;
    uid: string;
    unsubscribe: boolean;
    plan_id: number | null;
    paid: boolean;
    direct_paid: boolean;
  };
};
