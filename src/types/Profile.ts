/* eslint-disable camelcase */
export interface Profile {
  id: string;
  email: string;
  u_name?: string;
  team_avatar: {
    url?: string;
    size_100_100: {
      url?: string;
    };
    size_40_40: {
      url?: string;
    };
    size_32_32: {
      url?: string;
    };
    size_20_20: {
      url?: string;
    };
  };
  role: string;
  team_user: boolean;
  uid: string;
  unsubscribe: boolean;
  plan_id: string;
  paid: boolean;
  direct_paid: boolean;
}
