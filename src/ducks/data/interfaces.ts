export interface DataState {
  collected: { [x: string]: Package['package'] };
  error: string;
}

export interface Package {
  name: string;
  package: {
    data: { [x: string]: any };
    translation: { [x: string]: { [x: string]: any } };
    error: string;
  };
}
