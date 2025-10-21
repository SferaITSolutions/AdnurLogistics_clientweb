
export type IncubatorAndAcceleratorTagType = "incubator" | "accelerator";

export interface SlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export interface IMainStats {
  results: {
    startups: number;
    investors: number;
    accelerators: number;
    total_investment: number;
    events: number;
    grants: number;
  };
}

export interface IProfile {
  email: string;
  role: string;
  verified: boolean;
  photo: string | null;
  name: string | null;
  active: boolean;
  status: string;
}

export interface IPagination<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[] | [];
}

export interface IAllQueryParams {
  industry?: string[];
  limit?: string | number;
  offset?: string | number;
  program?: string;
  q?: string;
  stage?: string[];
  date?: string;
  type?: string;
  page?: string | number;
}

export interface IOneIdQueryParams {
  code?: string | null;
  state?: string | null;
}

export interface IGoogleQueryParams {
  code?: string | null;
  state?: string | null;
}

export interface ILinkedinQueryParams {
  code?: string | null;
  state?: string | null;
}

export interface IStartupQueryParams
  extends Pick<
    IAllQueryParams,
    "industry" | "limit" | "offset" | "q" | "stage"
  > { }


export type StageTypeValues =
  | "pre_seed"
  | "seed_"
  | "early_a"
  | "early_b"
  | "expansion";

export interface IError403 {
  detail: string;
}

export interface IError401 {
  detail: string;
  code: string | number;
}

export type FieldErrorMessages = Record<string, string[]>;

export interface IError400 extends FieldErrorMessages { }

export interface SearchParamsProps<T> {
  searchParams: T | { [key: string]: string | undefined };
}

export interface IMembers {
  name: string;
  position: string;
  photo?: string;
  image?: string;
}


export type InvestmentData = {
  id: number;
  investment_amount: string | number;
  name: string;
  investment_type: string;
  date: string;
  link: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export interface ProfileMarketType {
  id: number;
  country: { id: number, name: string }
  status: "inactive" | "active";
  date: string;
  created_at: string;
  updated_at: string;
}

export type PassedProgramsType = {
  id: number;
  region: {
    id: number;
    name: string;
    country_id: number;
    country_name: string;
  }
  name: string;
  date: string;
  program_type: string;
  certificate: string;
  status: string;
  link?: string;
  created_at: string;
  updated_at: string;
};

export interface IMembersDetail {
  id: number | string;
  name: string;
  position: string;
  photo: string | null;
  status: string;
  image?: string | null;
  linkedin: string;
  email: string;
}

export interface IEventStatistics {
  [key: string]: number;
}

export interface IAppliedFomList {
  id: number
  name: string
  status: string
  can_edit: boolean
  can_delete: boolean
  updated_at: string
  created_at: string
}[]

export interface AppliedDSAFormList {
  id: number
  name: string
  status: string
  registered_date: string
  updated_date: string
}

export interface IPlaces {
  id: string;
  name: string;
}

export type SearchCategory = 'startups' | 'investors' | 'accelerators' | 'mentors' | 'partners' | "news" | "events" | "programs";


export interface IFAQFilterForm
  extends Pick<IAllQueryParams, "page" | "q"> {
  stage?: string;
}