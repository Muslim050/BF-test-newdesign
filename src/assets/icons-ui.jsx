import React from 'react'

const SvgComponent = ({ children, className, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    {children}
  </svg>
)
export const ArrowLeft = (props) => (
  <SvgComponent
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
    {...props}
  >
    <path
      d="M7.57606 12.5467C7.44025 12.5467 7.30444 12.5 7.19722 12.4L2.85835 8.35335C2.65106 8.16002 2.65106 7.84002 2.85835 7.64668L7.19722 3.60002C7.40451 3.40668 7.74762 3.40668 7.95491 3.60002C8.16221 3.79335 8.16221 4.11335 7.95491 4.30668L3.99489 8.00002L7.95491 11.6934C8.16221 11.8867 8.16221 12.2067 7.95491 12.4C7.85484 12.5 7.71188 12.5467 7.57606 12.5467Z"
      stroke="currentcolor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.3889 8.5H3.35874C3.06567 8.5 2.82263 8.27333 2.82263 8C2.82263 7.72667 3.06567 7.5 3.35874 7.5H15.3889C15.682 7.5 15.925 7.72667 15.925 8C15.925 8.27333 15.682 8.5 15.3889 8.5Z"
      stroke="currentcolor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgComponent>
)

export const SidebarElement = (props) => (
  <SvgComponent
    width="27"
    height="105"
    viewBox="0 0 27 105"
    fill="none"
    {...props}
  >
    <path
      d="M0.141602 50.0323C0.141602 67.3373 25.5582 70.582 25.5582 100.866C25.5582 131.149 28.8029 -20.269 25.5582 3.5253C22.3136 27.3196 0.141602 32.7274 0.141602 50.0323Z"
      fill="white"
      fillOpacity="0.3"
    />
  </SvgComponent>
)

export const AnalyticsElement = (props) => (
  <SvgComponent
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    {...props}
  >
    <path
      d="M4.7832 11.5827L4.7832 8.91602"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M8.11719 11.5827L8.11719 4.91602"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M11.4492 11.582L11.4492 7.58203"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M1.7832 8.24935C1.7832 5.26379 1.7832 3.77101 2.7107 2.84351C3.63819 1.91602 5.13097 1.91602 8.11654 1.91602C11.1021 1.91602 12.5949 1.91602 13.5224 2.84351C14.4499 3.77101 14.4499 5.26379 14.4499 8.24935C14.4499 11.2349 14.4499 12.7277 13.5224 13.6552C12.5949 14.5827 11.1021 14.5827 8.11654 14.5827C5.13097 14.5827 3.63819 14.5827 2.7107 13.6552C1.7832 12.7277 1.7832 11.2349 1.7832 8.24935Z"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </SvgComponent>
)

export const EditSvg = (props) => (
  <SvgComponent
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    {...props}
  >
    <path
      d="M8.83958 2.9008L3.36624 8.69413C3.15958 8.91413 2.95958 9.34746 2.91958 9.64746L2.67291 11.8075C2.58624 12.5875 3.14624 13.1208 3.91958 12.9875L6.06624 12.6208C6.36624 12.5675 6.78624 12.3475 6.99291 12.1208L12.4662 6.32746C13.4129 5.32746 13.8396 4.18746 12.3662 2.79413C10.8996 1.41413 9.78624 1.9008 8.83958 2.9008Z"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.92578 3.86719C8.21245 5.70719 9.70578 7.11385 11.5591 7.30052"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 15.166H14"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgComponent>
)

export const CommentSvg = (props) => (
  <SvgComponent
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    {...props}
  >
    <path
      d="M10.6673 1.83398H5.33398C2.66732 1.83398 1.33398 3.16732 1.33398 5.83398V14.5007C1.33398 14.8673 1.63398 15.1673 2.00065 15.1673H10.6673C13.334 15.1673 14.6673 13.834 14.6673 11.1673V5.83398C14.6673 3.16732 13.334 1.83398 10.6673 1.83398Z"
      stroke="currentcolor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.66602 6.83398H11.3327"
      stroke="currentcolor"
      strokeWidth="1"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.66602 10.168H9.33268"
      stroke="currentcolor"
      strokeWidth="1"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgComponent>
)

export const MoreSvg = (props) => (
  <SvgComponent
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M11.9959 12H12.0049"
      stroke="currentcolor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.9998 12H16.0088"
      stroke="currentcolor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.99981 12H8.00879"
      stroke="currentcolor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
      stroke="currentcolor"
      strokeWidth="1.5"
    />
  </SvgComponent>
)

export const FilterSvg = (props) => (
  <SvgComponent
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      d="M18.3333 14.583H12.5"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.16602 14.583H1.66602"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.334 5.41699H15.834"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.49935 5.41699H1.66602"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.83268 12.083H10.8327C11.7493 12.083 12.4993 12.4997 12.4993 13.7497V15.4163C12.4993 16.6663 11.7493 17.083 10.8327 17.083H5.83268C4.91602 17.083 4.16602 16.6663 4.16602 15.4163V13.7497C4.16602 12.4997 4.91602 12.083 5.83268 12.083Z"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.16667 2.91699H14.1667C15.0833 2.91699 15.8333 3.33366 15.8333 4.58366V6.25033C15.8333 7.50033 15.0833 7.91699 14.1667 7.91699H9.16667C8.25 7.91699 7.5 7.50033 7.5 6.25033V4.58366C7.5 3.33366 8.25 2.91699 9.16667 2.91699Z"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgComponent>
)

export const OpenSvg = (props) => (
  <SvgComponent
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
      stroke="currentcolor"
      strokeWidth="1.5"
    />
    <path
      d="M14.0051 7L16 9M16 9L14.0051 11M16 9C13.1739 8.83333 7.62142 10.2 8.0204 17"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgComponent>
)

export const ChartSvg = (props) => (
  <SvgComponent
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M7 17L7 13"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 17L12 7"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M17 17L17 11"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </SvgComponent>
)
export const TvSvg = (props) => (
  <SvgComponent
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      d="M9.33398 2H6.66732C4.15316 2 2.89608 2 2.11503 2.78105C1.33398 3.5621 1.33398 4.81918 1.33398 7.33333C1.33398 9.84749 1.33398 11.1046 2.11503 11.8856C2.89608 12.6667 4.15316 12.6667 6.66732 12.6667H9.33398C11.8481 12.6667 13.1052 12.6667 13.8863 11.8856C14.6673 11.1046 14.6673 9.84749 14.6673 7.33333C14.6673 4.81918 14.6673 3.5621 13.8863 2.78105C13.1052 2 11.8481 2 9.33398 2Z"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 12.667L12.6667 14.0003"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 12.667L3.33333 14.0003"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgComponent>
)

export const FormatSvg = (props) => (
  <SvgComponent
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      d="M10.0007 15.1663H6.00065C2.38065 15.1663 0.833984 13.6197 0.833984 9.99967V5.99967C0.833984 2.37967 2.38065 0.833008 6.00065 0.833008H9.33398C9.60732 0.833008 9.83398 1.05967 9.83398 1.33301C9.83398 1.60634 9.60732 1.83301 9.33398 1.83301H6.00065C2.92732 1.83301 1.83398 2.92634 1.83398 5.99967V9.99967C1.83398 13.073 2.92732 14.1663 6.00065 14.1663H10.0007C13.074 14.1663 14.1673 13.073 14.1673 9.99967V6.66634C14.1673 6.39301 14.394 6.16634 14.6673 6.16634C14.9407 6.16634 15.1673 6.39301 15.1673 6.66634V9.99967C15.1673 13.6197 13.6207 15.1663 10.0007 15.1663Z"
      fill="currentcolor"
    />
    <path
      d="M14.6673 7.16633H12.0007C9.72065 7.16633 8.83398 6.27967 8.83398 3.99967V1.333C8.83398 1.133 8.95398 0.946334 9.14065 0.873C9.32732 0.793 9.54065 0.839667 9.68732 0.979667L15.0207 6.313C15.1607 6.453 15.2073 6.673 15.1273 6.85967C15.0473 7.04633 14.8673 7.16633 14.6673 7.16633ZM9.83398 2.53967V3.99967C9.83398 5.71967 10.2807 6.16633 12.0007 6.16633H13.4607L9.83398 2.53967Z"
      fill="currentcolor"
    />
    <path
      d="M8.66602 9.16699H4.66602C4.39268 9.16699 4.16602 8.94033 4.16602 8.66699C4.16602 8.39366 4.39268 8.16699 4.66602 8.16699H8.66602C8.93935 8.16699 9.16602 8.39366 9.16602 8.66699C9.16602 8.94033 8.93935 9.16699 8.66602 9.16699Z"
      fill="currentcolor"
    />
    <path
      d="M7.33268 11.833H4.66602C4.39268 11.833 4.16602 11.6063 4.16602 11.333C4.16602 11.0597 4.39268 10.833 4.66602 10.833H7.33268C7.60602 10.833 7.83268 11.0597 7.83268 11.333C7.83268 11.6063 7.60602 11.833 7.33268 11.833Z"
      fill="currentcolor"
    />
  </SvgComponent>
)

export const DateCalendarSvg = (props) => (
  <SvgComponent
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      d="M5.33301 1.33398V3.33398"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.667 1.33398V3.33398"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.33301 6.06055H13.6663"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 5.66732V11.334C14 13.334 13 14.6673 10.6667 14.6673H5.33333C3 14.6673 2 13.334 2 11.334V5.66732C2 3.66732 3 2.33398 5.33333 2.33398H10.6667C13 2.33398 14 3.66732 14 5.66732Z"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.99666 9.13411H8.00265"
      stroke="currentcolor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.52987 9.13411H5.53585"
      stroke="currentcolor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.52987 11.1341H5.53585"
      stroke="currentcolor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgComponent>
)

export const LinkSvg = (props) => (
  <SvgComponent
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      d="M6.36328 10.1376L9.63862 6.8623"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M1.35516 11.7688L0.614398 11.8861H0.614398L1.35516 11.7688ZM1.35516 11.2306L0.614398 11.1132L1.35516 11.2306ZM5.26977 15.1452L5.3871 15.8859H5.3871L5.26977 15.1452ZM4.73153 15.1452L4.84886 14.4044H4.84886L4.73153 15.1452ZM8.64614 11.7688L9.3869 11.8861V11.8861L8.64614 11.7688ZM8.64614 11.2306L9.3869 11.1132L9.3869 11.1132L8.64614 11.2306ZM4.73153 7.85419L4.84886 8.59495L4.84886 8.59495L4.73153 7.85419ZM5.26977 7.85419L5.3871 7.11342L5.38709 7.11342L5.26977 7.85419ZM5.4919 8.75643C5.83047 8.99507 6.29838 8.91407 6.53702 8.5755C6.77566 8.23694 6.69465 7.76903 6.35609 7.53039L5.4919 8.75643ZM8.96994 10.1442C8.7313 9.80567 8.26338 9.72467 7.92482 9.96331C7.58626 10.2019 7.50526 10.6699 7.74389 11.0084L8.96994 10.1442ZM3.34136 13.159C2.8734 12.691 2.56577 12.3819 2.35815 12.1239C2.15938 11.8768 2.11081 11.7454 2.09593 11.6515L0.614398 11.8861C0.686962 12.3443 0.910179 12.717 1.18941 13.0641C1.4598 13.4002 1.83637 13.7753 2.2807 14.2196L3.34136 13.159ZM2.28069 8.77972C1.83637 9.22405 1.4598 9.59916 1.18941 9.93525C0.910179 10.2823 0.686961 10.6551 0.614398 11.1132L2.09593 11.3479C2.11081 11.2539 2.15938 11.1226 2.35815 10.8755C2.56577 10.6174 2.8734 10.3083 3.34136 9.84038L2.28069 8.77972ZM2.09593 11.6515C2.08 11.5509 2.08 11.4484 2.09593 11.3479L0.614398 11.1132C0.573846 11.3693 0.573846 11.6301 0.614398 11.8861L2.09593 11.6515ZM6.65995 13.159C6.19199 13.6269 5.8829 13.9346 5.62483 14.1422C5.37776 14.3409 5.24639 14.3895 5.15244 14.4044L5.3871 15.8859C5.84524 15.8134 6.21798 15.5901 6.56507 15.3109C6.90117 15.0405 7.27628 14.664 7.72061 14.2196L6.65995 13.159ZM2.2807 14.2196C2.72502 14.664 3.10014 15.0405 3.43623 15.3109C3.78332 15.5901 4.15606 15.8134 4.61421 15.8859L4.84886 14.4044C4.75491 14.3895 4.62354 14.3409 4.37647 14.1422C4.1184 13.9346 3.80931 13.6269 3.34136 13.159L2.2807 14.2196ZM5.15245 14.4044C5.05188 14.4203 4.94943 14.4203 4.84886 14.4044L4.61421 15.8859C4.87024 15.9265 5.13106 15.9265 5.3871 15.8859L5.15245 14.4044ZM7.72061 14.2196C8.16493 13.7753 8.54151 13.4002 8.81189 13.0641C9.09112 12.717 9.31434 12.3443 9.3869 11.8861L7.90537 11.6515C7.89049 11.7454 7.84192 11.8768 7.64315 12.1239C7.43554 12.3819 7.1279 12.691 6.65995 13.159L7.72061 14.2196ZM7.90537 11.3479C7.9213 11.4485 7.9213 11.5509 7.90537 11.6515L9.3869 11.8861C9.42746 11.6301 9.42745 11.3693 9.3869 11.1132L7.90537 11.3479ZM3.34136 9.84038C3.80931 9.37243 4.1184 9.06479 4.37647 8.85717C4.62354 8.65841 4.75491 8.60983 4.84886 8.59495L4.61421 7.11342C4.15606 7.18598 3.78332 7.4092 3.43623 7.68844C3.10014 7.95882 2.72502 8.33539 2.28069 8.77972L3.34136 9.84038ZM5.38709 7.11342C5.13106 7.07287 4.87024 7.07287 4.61421 7.11342L4.84886 8.59495C4.94943 8.57903 5.05188 8.57903 5.15245 8.59495L5.38709 7.11342ZM6.35609 7.53039C6.06651 7.32627 5.75399 7.17153 5.3871 7.11342L5.15244 8.59495C5.22882 8.60705 5.32864 8.64135 5.4919 8.75643L6.35609 7.53039ZM7.74389 11.0084C7.85897 11.1717 7.89328 11.2715 7.90537 11.3479L9.3869 11.1132C9.32879 10.7463 9.17405 10.4338 8.96994 10.1442L7.74389 11.0084Z"
      fill="currentcolor"
    />
    <path
      d="M7.35516 5.23056L6.6144 5.11323V5.11323L7.35516 5.23056ZM7.35516 5.76879L6.6144 5.88612L7.35516 5.76879ZM11.2698 9.14516L11.3871 9.88593H11.3871L11.2698 9.14516ZM10.7315 9.14516L10.8489 8.4044L10.8489 8.40439L10.7315 9.14516ZM14.6461 5.23056L15.3869 5.11323V5.11323L14.6461 5.23056ZM14.6461 5.76879L15.3869 5.88612V5.88612L14.6461 5.76879ZM11.2698 1.85419L11.3871 1.11342L11.3871 1.11342L11.2698 1.85419ZM10.7315 1.85419L10.8489 2.59495L10.8489 2.59495L10.7315 1.85419ZM7.03136 6.85511C7.27 7.19368 7.73792 7.27468 8.07648 7.03604C8.41504 6.79741 8.49605 6.32949 8.25741 5.99093L7.03136 6.85511ZM10.5094 8.24292C10.1708 8.00428 9.70292 8.08528 9.46428 8.42385C9.22564 8.76241 9.30665 9.23032 9.64521 9.46896L10.5094 8.24292ZM8.2807 2.77972C7.83637 3.22404 7.4598 3.59916 7.18941 3.93525C6.91018 4.28234 6.68696 4.65508 6.6144 5.11323L8.09593 5.34788C8.11081 5.25394 8.15938 5.12256 8.35815 4.87549C8.56577 4.61742 8.8734 4.30833 9.34136 3.84038L8.2807 2.77972ZM8.09593 5.65147C8.08 5.5509 8.08 5.44845 8.09593 5.34788L6.6144 5.11323C6.57385 5.36926 6.57385 5.63009 6.6144 5.88612L8.09593 5.65147ZM12.6599 7.15897C12.192 7.62692 11.8829 7.93456 11.6248 8.14218C11.3778 8.34094 11.2464 8.38952 11.1524 8.4044L11.3871 9.88593C11.8452 9.81336 12.218 9.59015 12.5651 9.31091C12.9012 9.04053 13.2763 8.66396 13.7206 8.21963L12.6599 7.15897ZM11.1524 8.4044C11.0519 8.42032 10.9494 8.42032 10.8489 8.4044L10.6142 9.88593C10.8702 9.92648 11.1311 9.92648 11.3871 9.88593L11.1524 8.4044ZM12.6599 3.84038C13.1279 4.30833 13.4355 4.61742 13.6432 4.8755C13.8419 5.12256 13.8905 5.25394 13.9054 5.34788L15.3869 5.11323C15.3143 4.65508 15.0911 4.28234 14.8119 3.93525C14.5415 3.59916 14.1649 3.22405 13.7206 2.77972L12.6599 3.84038ZM13.7206 8.21963C14.1649 7.7753 14.5415 7.40019 14.8119 7.0641C15.0911 6.71701 15.3143 6.34427 15.3869 5.88612L13.9054 5.65147C13.8905 5.74541 13.8419 5.87679 13.6432 6.12385C13.4355 6.38193 13.1279 6.69102 12.6599 7.15897L13.7206 8.21963ZM13.9054 5.34788C13.9213 5.44845 13.9213 5.5509 13.9054 5.65147L15.3869 5.88612C15.4275 5.63008 15.4275 5.36926 15.3869 5.11323L13.9054 5.34788ZM13.7206 2.77972C13.2763 2.33539 12.9012 1.95882 12.5651 1.68844C12.218 1.4092 11.8452 1.18599 11.3871 1.11342L11.1524 2.59495C11.2464 2.60983 11.3778 2.65841 11.6248 2.85717C11.8829 3.06479 12.192 3.37243 12.6599 3.84038L13.7206 2.77972ZM9.34136 3.84038C9.80931 3.37243 10.1184 3.06479 10.3765 2.85717C10.6235 2.65841 10.7549 2.60983 10.8489 2.59495L10.6142 1.11342C10.1561 1.18598 9.78332 1.4092 9.43623 1.68844C9.10014 1.95882 8.72502 2.33539 8.2807 2.77972L9.34136 3.84038ZM11.3871 1.11342C11.1311 1.07287 10.8702 1.07287 10.6142 1.11342L10.8489 2.59495C10.9494 2.57903 11.0519 2.57903 11.1524 2.59495L11.3871 1.11342ZM8.25741 5.99093C8.14233 5.82766 8.10803 5.72784 8.09593 5.65147L6.6144 5.88612C6.67251 6.25301 6.82725 6.56553 7.03136 6.85511L8.25741 5.99093ZM9.64521 9.46896C9.9348 9.67308 10.2473 9.82782 10.6142 9.88593L10.8489 8.40439C10.7725 8.3923 10.6727 8.358 10.5094 8.24292L9.64521 9.46896Z"
      fill="currentcolor"
    />{' '}
  </SvgComponent>
)

export const CheckCompletedSvg = (props) => (
  <SvgComponent
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_4349_462)">
      <path
        d="M2.62695 7.99935C2.62695 5.01379 2.62695 3.52101 3.55445 2.59351C4.48194 1.66602 5.97472 1.66602 8.96029 1.66602C11.9458 1.66602 13.4386 1.66602 14.3661 2.59351C15.2936 3.52101 15.2936 5.01379 15.2936 7.99935C15.2936 10.9849 15.2936 12.4777 14.3661 13.4052C13.4386 14.3327 11.9458 14.3327 8.96029 14.3327C5.97472 14.3327 4.48194 14.3327 3.55445 13.4052C2.62695 12.4777 2.62695 10.9849 2.62695 7.99935Z"
        stroke="currentcolor"
        strokeWidth="1.5"
      />
      <path
        d="M6.29297 8.33333L7.95964 10L11.6263 6"
        stroke="currentcolor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_4349_462">
        <rect
          width="16"
          height="16"
          fill="currentcolor"
          transform="translate(0.960938)"
        />
      </clipPath>
    </defs>
  </SvgComponent>
)
