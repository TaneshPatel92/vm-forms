import * as Yup from 'yup'

const OTPRegex = /^(\s*\d{6}\s*)$/
// common for UAE and India
const MobileIndependentRegex = /^[5-9]\d{8,9}$/

const UAERegex = /^[5]\d{8}$/

const PROFILE_IMAGE_SIZE = 2500;
const FILE_UPLOAD_SIZE = 3000;

export const OTPFormValid = Yup.object().shape({
  otp: Yup.string().trim().matches(OTPRegex, 'OTP Should be 6 digit number only')
})
export const SignInNewValidation = Yup.object().shape({
  mobile: Yup.string()
    .required('Mobile Number is required')
    .matches(MobileIndependentRegex, 'Mobile Number is not valid'),
  otp: Yup.string().matches(OTPRegex, 'OTP Should be 6 digit number only')
})
export const SignInNewValidationWithOTP = Yup.object().shape({
  mobile: Yup.string().trim()
    .required('Mobile Number is required')
    .matches(MobileIndependentRegex, 'Mobile Number is not valid'),
  otp: Yup.string().trim().matches(OTPRegex, 'OTP Should be 6 digit number only').required('OTP is required')
})

export const forgotFormValidationSchema = Yup.object().shape({
  email: Yup.string().trim()
    .email('Enter a valid email')
    .required('Email is Required')
})
const NameIndependentRegex = /^[A-Za-z ]+$/
const PanIndependentRegex = /^([a-zA-Z]){3}([a-cA-Cf-hF-HljptLJPT]){1}([a-zA-Z]){1}([0-9]){4}([a-zA-Z]){1}?$/
const AadharIndependentRegex = /^[0-9]{12}$/

export const IndependentFormValidationSchema = Yup.object().shape({
  avatar: Yup.mixed()
    // .required("Please Select a Profile Image")
    .test(
      "fileSize",
      "Profile Image should be less than 2.5Mb",
      value => {
        if (value) {
          const base64String = value;
          var stringLength = base64String.length - 'data:image/png;base64,'.length;
          var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
          var sizeInKb = sizeInBytes / 1000
          return value && sizeInKb <= PROFILE_IMAGE_SIZE
        }
        else {
          return true
        }
      }
    ),
  fname: Yup.string().trim()
    .required('First Name is Required')
    .matches(NameIndependentRegex, 'First Name is not Valid'),
  lname: Yup.string().trim()
    .required('Last Name is required')
    .matches(NameIndependentRegex, 'Last Name is not Valid'),
  email: Yup.string().trim()
    .email('Enter a valid email')
    .required('Email is required'),
  country: Yup.string().required('Country Name is required'),
  city: Yup.string().required('City Name is required'),
  state: Yup.string().required('State Name is required'),
  address: Yup.string().trim().required('Address is required'),
  // PAN: Yup.string().trim()
  //   .required('PAN Number is required')
  //   .matches(PanIndependentRegex, 'PAN is not valid'),
  // Aadhar: Yup.string().trim()
  //   .required('Aadhar is required')
  //   .matches(AadharIndependentRegex, 'Aadhar is not valid'),
  // mobile: Yup.string().trim()
  //   .required('Mobile Number is required')
  //   .matches(MobileIndependentRegex, 'Mobile Number is not valid'),
  // dateofbirth: Yup.string().required('Date of Birth is required').nullable(),
  education: Yup.string().required('Education is required'),
  certificate: Yup.mixed().required('Certificate is required')
    .test(
      "fileSize",
      "File should be less than 3Mb size",
      value => {
        if (value) {
          if (value.base64url) {
            const base64String = value.base64url;
            var stringLength = base64String.length - 'data:application/pdf;base64,'.length;
            var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
            var sizeInKb = sizeInBytes / 1000
            return value && sizeInKb <= FILE_UPLOAD_SIZE
          }
          else
            return false
        }
        else {
          return false
        }
      }
    ),
  workyears: Yup.string().required('Work Year is required'),
  // workmonth: Yup.string().required('Work Month is required'),
  services: Yup.array()
    .min(1, 'Pick at least 1 service')
    .max(10, 'Please select only 10 services')
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required()
      })
    ),
  about: Yup.string().trim().required('About Field is required'),
  agree: Yup.bool()
    .oneOf([true], 'Please accept Terms and Conditions')
    .required()
})
export const IndependentFormValidationSchemaUpdate = Yup.object().shape({
  avatar: Yup.mixed()
    .test(
      "fileSize",
      "Profile Image should be less than 2.5Mb",
      value => {
        if (value) {
          const base64String = value;
          var stringLength = base64String.length - 'data:image/png;base64,'.length;
          var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
          var sizeInKb = sizeInBytes / 1000
          return value && sizeInKb <= PROFILE_IMAGE_SIZE
        }
        else {
          return true
        }
      }
    ),
  fname: Yup.string().trim()
    .required('First Name is Required')
    .matches(NameIndependentRegex, 'First Name is not Valid'),
  lname: Yup.string().trim()
    .required('Last Name is required')
    .matches(NameIndependentRegex, 'Last Name is not Valid'),
  email: Yup.string().trim()
    .email('Enter a valid email')
    .required('Email is required'),
  country: Yup.string().required('Country Name is required'),
  city: Yup.string().required('City Name is required'),
  state: Yup.string().required('State Name is required'),
  address: Yup.string().trim().required('Address is required'),
  workyears: Yup.string().required('Work Year is required'),
  about: Yup.string().trim().required('About Field is required')
})

const GSTOrganisationRegex = /^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/
const TANOrganisationRegex = /^([a-zA-Z]){4}([0-9]){5}([a-zA-Z]){1}?$/
const TELEPHONEOrgRegex = /^([0]){1}([0-9]){10}?$/
export const OrganizationFormValidationSchema = Yup.object().shape({
  avatar: Yup.mixed()
    // .required("Please Select a Profile Image")
    .test(
      "fileSize",
      "Profile Image should be less than 2.5Mb",
      value => {
        if (value) {
          const base64String = value;
          var stringLength = base64String.length - 'data:image/png;base64,'.length;
          var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
          var sizeInKb = sizeInBytes / 1000
          return value && sizeInKb <= PROFILE_IMAGE_SIZE
        }
        else {
          return true
        }
      }
    ),
  oname: Yup.string().trim()
    .required('Organization name is required')
    .matches(NameIndependentRegex, 'Organization name is not Valid'),
  cname: Yup.string().trim()
    .required('Communicator name is required')
    .matches(NameIndependentRegex, 'Communicator name is not Valid'),
  oemail: Yup.string().trim()
    .email('Enter a valid email')
    .required('Email is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  address: Yup.string().trim().required('Address is required'),
  // gst: Yup.string().trim()
  //   .required('GST no. is required')
  //   .matches(GSTOrganisationRegex, 'GST no. is not valid'),
  // tan: Yup.string().trim()
  //   .required('Tan no. is required')
  //   .matches(TANOrganisationRegex, 'Tan no. is not valid'),
  // telephone: Yup.string().trim()
  //   .required('Phone number is required')
  //   .matches(MobileIndependentRegex, 'Phone number is not valid'),
  // phone: Yup.string().trim()
  //   .required('Phone number is required')
  //   .matches(MobileIndependentRegex, 'Phone number is not valid'),
  startyear: Yup.string().required('Start year is required'),
  totalmember: Yup.number().required('Total members is required'),
  services: Yup.array()
    .min(1, 'Pick at least 1 service')
    .max(10, 'Please select only 10 services')
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required()
      })
    ),
  about: Yup.string().trim().required('About Field is required'),
  agree: Yup.bool()
    .oneOf([true], 'Please accept Terms and Conditions')
    .required()
})

export const OrganizationFormUpdateValidationSchema = Yup.object().shape({
  avatar: Yup.mixed()
    // .required("Please Select a Profile Image")
    .test(
      "fileSize",
      "Profile Image should be less than 2.5Mb",
      value => {
        if (value) {
          const base64String = value;
          var stringLength = base64String.length - 'data:image/png;base64,'.length;
          var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
          var sizeInKb = sizeInBytes / 1000
          return value && sizeInKb <= PROFILE_IMAGE_SIZE
        }
        else {
          return true
        }
      }
    ),
  oname: Yup.string().trim()
    .required('Organization name is required')
    .matches(NameIndependentRegex, 'Organization name is not Valid'),
  cname: Yup.string().trim()
    .required('Company name is required')
    .matches(NameIndependentRegex, 'Company name is not Valid'),
  oemail: Yup.string().trim()
    .email('Enter a valid email')
    .required('Email is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  address: Yup.string().required('Address is required'),
  startyear: Yup.string().required('Start year is required'),
  totalmember: Yup.number().required('Total members is required'),
  about: Yup.string().trim().required('About Field is required')
})


export const UserProfileUpdateForm = Yup.object().shape({
  avatar: Yup.mixed()
    .test(
      "fileSize",
      "Profile Image should be less than 2.5Mb",
      value => {
        if (value) {
          const base64String = value;
          var stringLength = base64String.length - 'data:image/png;base64,'.length;
          var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
          var sizeInKb = sizeInBytes / 1000
          return value && sizeInKb <= PROFILE_IMAGE_SIZE
        }
        else {
          return false
        }
      }
    )
})

export const UserSignupFormValidationSchema = Yup.object().shape({
  avatar: Yup.mixed()
    // .required("Please Select a Profile Image")
    .test(
      "fileSize",
      "Profile Image should be less than 2.5Mb",
      value => {
        if (value) {
          const base64String = value;
          var stringLength = base64String.length - 'data:image/png;base64,'.length;
          var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
          var sizeInKb = sizeInBytes / 1000
          return value && sizeInKb <= PROFILE_IMAGE_SIZE
        }
        else return true
      }
    ),
  fname: Yup.string().trim()
    .required('First Name is required')
    .matches(NameIndependentRegex, 'First Name is not Valid'),
  lname: Yup.string().trim()
    .required('Last Name is required')
    .matches(NameIndependentRegex, 'Last Name is not Valid'),
  email: Yup.string().trim()
    .email('Enter a valid email')
    .required('Email is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  // mobile: Yup.string().trim()
  //   .required('Mobile Number is required')
  //   .matches(MobileIndependentRegex, 'Mobile Number is not valid'),
  // dateofbirth: Yup.string().required('Date of Birth is required').nullable(),
  agree: Yup.bool()
    .oneOf([true], 'Please accept Terms and Conditions')
    .required('Please accept Terms and Conditions'),
  // gender: Yup.string().required('Gender is required'),

})


export const MemberUpdateFormValidationSchema = Yup.object().shape({
  firstName: Yup.string().trim()
    .required('First Name is required')
    .matches(NameIndependentRegex, 'First Name is not Valid'),
  lastName: Yup.string().trim()
    .required('Last Name is required')
    .matches(NameIndependentRegex, 'Last Name is not Valid'),
  email: Yup.string().trim()
    .email('Enter a valid email')
    .required('Email is required'),
  mobile: Yup.string().required('Mobile number is required'),
  countryId: Yup.string().required('Country is required'),
  cityId: Yup.string().required('City is required'),
  stateId: Yup.string().required('State is required'),
})

export const PasswordFormValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().trim().required('Old Password is required'),
  newPassword: Yup.string().trim().required('New Password is required'),
  reenterPassword: Yup.string().trim().required('Re-Enter New Password is required')
})

export const UserCreateJobSelectService = Yup.object().shape({
  serviceId: Yup.string().required('Service is required'),
  count: Yup.number().required('Count is required'),
  description: Yup.string().trim().required('Job Description is required')
})

export const UpdateServiceCostValidationSchema = Yup.object().shape({
  providerInput: Yup.string().trim().required('Cost is Required')
})

export const CancelJobValidationSchema = Yup.object().shape({
  reason: Yup.string().trim().required('Reason is Required')
})

export const UserCreateJobBillingContact = Yup.object().shape({
  name: Yup.string().trim().required('Name is required'),
  service: Yup.string().trim().required('Service is required'),
  count: Yup.number().required('Count is required'),
  phone: Yup.string('Not a valid Number').trim().required('Phone Number is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  address: Yup.string().trim().required('Address is required'),
  country: Yup.string().trim().required('Country is required'),
  city: Yup.string().required('City is required')
})

export const UserCreateJobPaymentForm = Yup.object().shape({
  name: Yup.string().trim().required('Name is required'),
  cardno: Yup.number().required('CardNumber is required'),
  cvv: Yup.number().required('CVV is required'),
  expDate: Yup.string().required('Date is required'),
  agree: Yup.bool().oneOf([true], 'Field must be checked')
})

const DateRegex = /^(((0)[0-9])|((1)[0-2]))(\/)\d{2}$/
const NameRegex = /^[A-Za-z]|[]+$/
const IFSCRegex = /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/
const AccNoRegex = /^\d{9,18}$/
export const PaymentForm = Yup.object().shape({
  ifsc: Yup.string().trim()
    .required('IFSC code is required')
    .matches(IFSCRegex, 'Invalid IFSC code'),
  accountNumber: Yup.string().trim()
    .required('Account Number is required')
    .matches(AccNoRegex, "This is doesn't look like an account number"),
  accountName: Yup.string().trim()
    .required('Name is required')
    .typeError('This is not a valid Name')
    .matches(NameRegex, 'Name is not Valid'),
  bankName: Yup.string().trim().required('Bank Name is required')
})

export const AdminSettingsQualification = Yup.object().shape({
  name: Yup.string().required('Qualification Name is required'),
  description: Yup.string().required('Qualification full name is required').nullable()
})

export const AdminSettingsServices = Yup.object().shape({
  name: Yup.string().trim().required('Service name is required'),
  // description: Yup.string().trim().required('Service description is required').nullable(),
  descriptionRTF: Yup.string().trim().required('Service Description is required').nullable(),
})

export const AdminSettingsState = Yup.object().shape({
  name: Yup.string().trim().required('State Name is required'),
  description: Yup.string().trim().required('State description is required').nullable(),
  countryId: Yup.string().required('Country is required')
})

export const AdminSettingsCity = Yup.object().shape({
  name: Yup.string().trim().required('City name is required'),
  description: Yup.string().trim().required('City description is required').nullable(),
  countryId: Yup.string().required('Please select country'),
  stateId: Yup.string().required('Please select state')
})

const RatingRegex = /^[1-5]{1}$/
export const feedbackAndReviewForm = Yup.object().shape({
  ratings: Yup.string().matches(RatingRegex, 'Please give ratings')
    .required('Please give ratings'),
  reviews: Yup.string().trim().required('Please write review')
})



export const getDefaultProfPic = () => {
  return "data:image/png;base64,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"
}