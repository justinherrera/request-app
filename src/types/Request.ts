export interface Suggestion {
  name: string;
  phone: string | undefined;
}

export interface FormError {
  name: string;
  about: string
}

export interface FormValue extends FormError{
  urgency: string
}
