import { SVGProps } from "react";

export default function ProfileUser(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M2 10c0-3.771 0-5.657 1.172-6.828S6.229 2 10 2h4c3.771 0 5.657 0 6.828 1.172S22 6.229 22 10v4c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14zm5.739 6.447a7 7 0 0 1 11.023 3.741a1 1 0 0 1-1.932.518a5 5 0 0 0-9.66 0a1 1 0 1 1-1.931-.518a7 7 0 0 1 2.5-3.741M10 9a2 2 0 1 1 4 0a2 2 0 0 1-4 0m2-4a4 4 0 1 0 0 8a4 4 0 0 0 0-8"
          clipRule="evenodd"></path>
        <rect width="19" height="19" x="2.5" y="2.5" stroke="currentColor" rx="3.5"></rect>
      </g>
    </svg>
  );
}
