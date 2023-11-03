const countryOptions = [
  { value: 142, name: 'Moldova, Republic of' },
  { value: 1, name: 'United States' },
  { value: 2, name: 'Canada' },
  { value: 3, name: 'Afghanistan' },
  { value: 4, name: 'Albania' },
  { value: 5, name: 'Algeria' },
  { value: 6, name: 'American Samoa' },
  { value: 7, name: 'Andorra' },
  { value: 8, name: 'Angola' },
  { value: 9, name: 'Anguilla' },
  { value: 10, name: 'Antarctica' },
  { value: 11, name: 'Antigua and/or Barbuda' },
  { value: 12, name: 'Argentina' },
  { value: 13, name: 'Armenia' },
  { value: 14, name: 'Aruba' },
  { value: 15, name: 'Australia' },
  { value: 16, name: 'Austria' },
  { value: 17, name: 'Azerbaijan' },
  { value: 18, name: 'Bahamas' },
  { value: 19, name: 'Bahrain' },
  { value: 20, name: 'Bangladesh' },
  { value: 21, name: 'Barbados' },
  { value: 22, name: 'Belarus' },
  { value: 23, name: 'Belgium' },
  { value: 24, name: 'Belize' },
  { value: 25, name: 'Benin' },
  { value: 26, name: 'Bermuda' },
  { value: 27, name: 'Bhutan' },
  { value: 28, name: 'Bolivia' },
  { value: 29, name: 'Bosnia and Herzegovina' },
  { value: 30, name: 'Botswana' },
  { value: 31, name: 'Bouvet Island' },
  { value: 32, name: 'Brazil' },
  { value: 34, name: 'Brunei Darussalam' },
  { value: 35, name: 'Bulgaria' },
  { value: 36, name: 'Burkina Faso' },
  { value: 37, name: 'Burundi' },
  { value: 38, name: 'Cambodia' },
  { value: 39, name: 'Cameroon' },
  { value: 40, name: 'Cape Verde' },
  { value: 41, name: 'Cayman Islands' },
  { value: 42, name: 'Central African Republic' },
  { value: 43, name: 'Chad' },
  { value: 44, name: 'Chile' },
  { value: 45, name: 'China' },
  { value: 46, name: 'Christmas Island' },
  { value: 47, name: 'Cocos (Keeling) Islands' },
  { value: 48, name: 'Colombia' },
  { value: 49, name: 'Comoros' },
  { value: 50, name: 'Congo' },
  { value: 51, name: 'Cook Islands' },
  { value: 52, name: 'Costa Rica' },
  { value: 53, name: 'Croatia (Hrvatska)' },
  { value: 54, name: 'Cuba' },
  { value: 55, name: 'Cyprus' },
  { value: 56, name: 'Czech Republic' },
  { value: 57, name: 'Denmark' },
  { value: 58, name: 'Djibouti' },
  { value: 59, name: 'Dominica' },
  { value: 60, name: 'Dominican Republic' },
  { value: 61, name: 'East Timor' },
  { value: 62, name: 'Ecuador' },
  { value: 63, name: 'Egypt' },
  { value: 64, name: 'El Salvador' },
  { value: 65, name: 'Equatorial Guinea' },
  { value: 66, name: 'Eritrea' },
  { value: 67, name: 'Estonia' },
  { value: 68, name: 'Ethiopia' },
  { value: 69, name: 'Falkland Islands (Malvinas)' },
  { value: 70, name: 'Faroe Islands' },
  { value: 71, name: 'Fiji' },
  { value: 72, name: 'Finland' },
  { value: 73, name: 'France' },
  { value: 74, name: 'France, Metropolitan' },
  { value: 75, name: 'French Guiana' },
  { value: 76, name: 'French Polynesia' },
  { value: 77, name: 'French Southern Territories' },
  { value: 78, name: 'Gabon' },
  { value: 79, name: 'Gambia' },
  { value: 80, name: 'Georgia' },
  { value: 81, name: 'Germany' },
  { value: 82, name: 'Ghana' },
  { value: 83, name: 'Gibraltar' },
  { value: 84, name: 'Greece' },
  { value: 85, name: 'Greenland' },
  { value: 86, name: 'Grenada' },
  { value: 87, name: 'Guadeloupe' },
  { value: 88, name: 'Guam' },
  { value: 89, name: 'Guatemala' },
  { value: 90, name: 'Guinea' },
  { value: 91, name: 'Guinea-Bissau' },
  { value: 92, name: 'Guyana' },
  { value: 93, name: 'Haiti' },
  { value: 94, name: 'Heard and Mc Donald Islands' },
  { value: 95, name: 'Honduras' },
  { value: 96, name: 'Hong Kong' },
  { value: 97, name: 'Hungary' },
  { value: 98, name: 'Iceland' },
  { value: 99, name: 'India' },
  { value: 100, name: 'Indonesia' },
  { value: 101, name: 'Iran (Islamic Republic of)' },
  { value: 102, name: 'Iraq' },
  { value: 103, name: 'Ireland' },
  { value: 104, name: 'Israel' },
  { value: 105, name: 'Italy' },
  { value: 106, name: 'Ivory Coast' },
  { value: 107, name: 'Jamaica' },
  { value: 108, name: 'Japan' },
  { value: 109, name: 'Jordan' },
  { value: 110, name: 'Kazakhstan' },
  { value: 111, name: 'Kenya' },
  { value: 112, name: 'Kiribati' },
  //eslint-disable-next-line
  { value: 113, name: "Korea, Democratic People's Republic of" },
  { value: 114, name: 'Korea, Republic of' },
  { value: 115, name: 'Kosovo' },
  { value: 116, name: 'Kuwait' },
  { value: 117, name: 'Kyrgyzstan' },
  //eslint-disable-next-line
  { value: 118, name: "Lao People's Democratic Republic" },
  { value: 119, name: 'Latvia' },
  { value: 120, name: 'Lebanon' },
  { value: 121, name: 'Lesotho' },
  { value: 122, name: 'Liberia' },
  { value: 123, name: 'Libyan Arab Jamahiriya' },
  { value: 124, name: 'Liechtenstein' },
  { value: 125, name: 'Lithuania' },
  { value: 126, name: 'Luxembourg' },
  { value: 127, name: 'Macau' },
  { value: 128, name: 'Macedonia' },
  { value: 129, name: 'Madagascar' },
  { value: 130, name: 'Malawi' },
  { value: 131, name: 'Malaysia' },
  { value: 132, name: 'Maldives' },
  { value: 133, name: 'Mali' },
  { value: 134, name: 'Malta' },
  { value: 135, name: 'Marshall Islands' },
  { value: 136, name: 'Martinique' },
  { value: 137, name: 'Mauritania' },
  { value: 138, name: 'Mauritius' },
  { value: 139, name: 'Mayotte' },
  { value: 140, name: 'Mexico' },
  { value: 141, name: 'Micronesia, Federated States of' },
  { value: 143, name: 'Monaco' },
  { value: 144, name: 'Mongolia' },
  { value: 145, name: 'Montenegro' },
  { value: 146, name: 'Montserrat' },
  { value: 147, name: 'Morocco' },
  { value: 148, name: 'Mozambique' },
  { value: 149, name: 'Myanmar' },
  { value: 150, name: 'Namibia' },
  { value: 151, name: 'Nauru' },
  { value: 152, name: 'Nepal' },
  { value: 153, name: 'Netherlands' },
  { value: 154, name: 'Netherlands Antilles' },
  { value: 155, name: 'New Caledonia' },
  { value: 156, name: 'New Zealand' },
  { value: 157, name: 'Nicaragua' },
  { value: 158, name: 'Niger' },
  { value: 159, name: 'Nigeria' },
  { value: 160, name: 'Niue' },
  { value: 161, name: 'Norfork Island' },
  { value: 162, name: 'Northern Mariana Islands' },
  { value: 163, name: 'Norway' },
  { value: 164, name: 'Oman' },
  { value: 165, name: 'Pakistan' },
  { value: 166, name: 'Palau' },
  { value: 167, name: 'Panama' },
  { value: 168, name: 'Papua New Guinea' },
  { value: 169, name: 'Paraguay' },
  { value: 170, name: 'Peru' },
  { value: 171, name: 'Philippines' },
  { value: 172, name: 'Pitcairn' },
  { value: 173, name: 'Poland' },
  { value: 174, name: 'Portugal' },
  { value: 175, name: 'Puerto Rico' },
  { value: 176, name: 'Qatar' },
  { value: 177, name: 'Reunion' },
  { value: 178, name: 'Romania' },
  { value: 179, name: 'Russian Federation' },
  { value: 180, name: 'Rwanda' },
  { value: 181, name: 'Saint Kitts and Nevis' },
  { value: 182, name: 'Saint Lucia' },
  { value: 183, name: 'Saint Vincent and the Grenadines' },
  { value: 184, name: 'Samoa' },
  { value: 185, name: 'San Marino' },
  { value: 186, name: 'Sao Tome and Principe' },
  { value: 187, name: 'Saudi Arabia' },
  { value: 188, name: 'Senegal' },
  { value: 189, name: 'Serbia' },
  { value: 190, name: 'Seychelles' },
  { value: 191, name: 'Sierra Leone' },
  { value: 192, name: 'Singapore' },
  { value: 193, name: 'Slovakia' },
  { value: 194, name: 'Slovenia' },
  { value: 195, name: 'Solomon Islands' },
  { value: 196, name: 'Somalia' },
  { value: 197, name: 'South Africa' },
  { value: 198, name: 'South Georgia South Sandwich Islands' },
  { value: 199, name: 'Spain' },
  { value: 200, name: 'Sri Lanka' },
  { value: 201, name: 'St. Helena' },
  { value: 202, name: 'St. Pierre and Miquelon' },
  { value: 203, name: 'Sudan' },
  { value: 204, name: 'Suriname' },
  { value: 205, name: 'Svalbarn and Jan Mayen Islands' },
  { value: 206, name: 'Swaziland' },
  { value: 207, name: 'Sweden' },
  { value: 208, name: 'Switzerland' },
  { value: 209, name: 'Syrian Arab Republic' },
  { value: 210, name: 'Taiwan' },
  { value: 211, name: 'Tajikistan' },
  { value: 212, name: 'Tanzania, United Republic of' },
  { value: 213, name: 'Thailand' },
  { value: 214, name: 'Togo' },
  { value: 215, name: 'Tokelau' },
  { value: 216, name: 'Tonga' },
  { value: 217, name: 'Trinidad and Tobago' },
  { value: 218, name: 'Tunisia' },
  { value: 219, name: 'Turkey' },
  { value: 220, name: 'Turkmenistan' },
  { value: 221, name: 'Turks and Caicos Islands' },
  { value: 222, name: 'Tuvalu' },
  { value: 223, name: 'Uganda' },
  { value: 224, name: 'Ukraine' },
  { value: 225, name: 'United Arab Emirates' },
  { value: 226, name: 'United Kingdom' },
  { value: 227, name: 'United States minor outlying islands' },
  { value: 228, name: 'Uruguay' },
  { value: 229, name: 'Uzbekistan' },
  { value: 230, name: 'Vanuatu' },
  { value: 231, name: 'Vatican City State' },
  { value: 232, name: 'Venezuela' },
  { value: 233, name: 'Vietnam' },
  { value: 238, name: 'Yemen' },
  { value: 239, name: 'Yugoslavia' },
  { value: 240, name: 'Zaire' },
  { value: 241, name: 'Zambia' },
  { value: 242, name: 'Zimbabwe' },
] as const;

const getCountryOptions = () => {
  return countryOptions;
};

const getCountryNameById = (id: number) => {
  return getCountryOptions().find((counrty) => counrty.value === id)?.name;
};

const getCountryIdByName = (name: string) => {
  return getCountryOptions().find((counrty) => counrty.name === name)?.value;
};

const getCountryIndexById = (id: number) => {
  for (let i = 0; i < getCountryOptions().length; i++) {
    if (getCountryOptions()[i].value === id) {
      return i;
    }
  }

  return 0;
};

export {
  getCountryOptions,
  getCountryNameById,
  getCountryIdByName,
  getCountryIndexById,
};
