export interface DataState {
  collected: { [x: string]: Package['data'] };
  error: string;
}

export interface Package {
  name: string;
  data: { [x: string]: any };
}
