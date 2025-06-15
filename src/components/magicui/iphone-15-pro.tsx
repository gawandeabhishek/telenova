import { SVGProps } from "react";

export interface Iphone15ProProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  src?: string;
  videoSrc?: string;
  horizontal?: boolean;
}

export default function Iphone15Pro({
  width = 433,
  height = 882,
  src,
  videoSrc,
  horizontal = false,
  ...props
}: Iphone15ProProps) {
  // Dimensions swap for horizontal mode
  const finalWidth = horizontal ? height : width;
  const finalHeight = horizontal ? width : height;
  const viewBox = horizontal ? "0 0 882 433" : "0 0 433 882";

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {horizontal ? (
        // HORIZONTAL LAYOUT
        <>
          <path
            d="M73 431C32.6832 431 0 398.317 0 358V76C0 35.6832 32.6832 3 73 3H809C849.317 3 882 35.6832 882 76V358C882 398.317 849.317 431 809 431H73Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            d="M171 433C170.448 433 170 432.552 170 432V430H204V432C204 432.552 203.552 433 203 433H171Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            d="M234 432C233.448 432 233 431.552 233 431V429.5H300V431C300 431.552 299.552 432 299 432H234Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            d="M319 432C318.448 432 318 431.552 318 431V429.5H385V431C385 431.552 384.552 432 384 432H319Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            d="M279 0H280C280.552 0 281 0.447715 281 1V3H385C385.552 3 386 3.44772 386 4V6H279V0Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            d="M74 426C35.3401 426 4 394.66 4 356V76C4 37.3401 35.3401 6 74 6H808C846.66 6 878 37.3401 878 76V356C878 394.66 846.66 426 808 426H74Z"
            className="fill-white dark:fill-[#262626]"
          />
          <path
            opacity="0.5"
            d="M5 258H5.5C6.60457 258 7.5 257.105 7.5 256V176C7.5 174.895 6.60457 174 5.5 174H5V258Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            d="M75 411.75C44.2101 411.75 19.25 386.79 19.25 356V78C19.25 47.2101 44.2101 22.25 75 22.25H807C837.79 22.25 862.75 47.2101 862.75 78V356C862.75 386.79 837.79 411.75 807 411.75H75Z"
            className="fill-[#E5E5E5] stroke-[#E5E5E5] stroke-[0.5] dark:fill-[#404040] dark:stroke-[#404040]"
          />

          {src && (
            <image
              href={src}
              x="19.25"
              y="22.25"
              width="843.5"
              height="389.5"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#roundedCornersH)"
            />
          )}
          {videoSrc && (
            <foreignObject x="19.25" y="22.25" width="843.5" height="389.5">
              <video
                className="size-full overflow-hidden rounded-[55.75px] object-cover"
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
              />
            </foreignObject>
          )}
          <path
            d="M48.5 278C38.2827 278 30 269.717 30 259.5V172.5C30 162.283 38.2827 154 48.5 154C58.7173 154 67 162.283 67 172.5V259.5C67 269.717 58.7173 278 48.5 278Z"
            className="fill-[#F5F5F5] dark:fill-[#262626]"
          />
          <path
            d="M48.5 270C42.701 270 38 265.299 38 259.5C38 253.701 42.701 249 48.5 249C54.299 249 59 253.701 59 259.5C59 265.299 54.299 270 48.5 270Z"
            className="fill-[#F5F5F5] dark:fill-[#262626]"
          />
          <path
            d="M48.5 265C45.4624 265 43 262.538 43 259.5C43 256.462 45.4624 254 48.5 254C51.5376 254 54 256.462 54 259.5C54 262.538 51.5376 265 48.5 265Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <defs>
            <clipPath id="roundedCornersH">
              <rect
                x="19.25"
                y="22.25"
                width="843.5"
                height="389.5"
                rx="55.75"
                ry="55.75"
              />
            </clipPath>
          </defs>
        </>
      ) : (
        // VERTICAL LAYOUT (original)
        <>
          <path
            d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
            className="fill-white dark:fill-[#262626]"
          />
          <path
            opacity="0.5"
            d="M174 5H258V5.5C258 6.60457 257.105 7.5 256 7.5H176C174.895 7.5 174 6.60457 174 5.5V5Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            d="M21.25 75C21.25 44.2101 46.2101 19.25 77 19.25H355C385.79 19.25 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 21.25 837.79 21.25 807V75Z"
            className="fill-[#E5E5E5] stroke-[#E5E5E5] stroke-[0.5] dark:fill-[#404040] dark:stroke-[#404040]"
          />

          {src && (
            <image
              href={src}
              x="21.25"
              y="19.25"
              width="389.5"
              height="843.5"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#roundedCornersV)"
            />
          )}
          {videoSrc && (
            <foreignObject x="21.25" y="19.25" width="389.5" height="843.5">
              <video
                className="size-full overflow-hidden rounded-[55.75px] object-cover"
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
              />
            </foreignObject>
          )}
          <path
            d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z"
            className="fill-[#F5F5F5] dark:fill-[#262626]"
          />
          <path
            d="M249 48.5C249 42.701 253.701 38 259.5 38C265.299 38 270 42.701 270 48.5C270 54.299 265.299 59 259.5 59C253.701 59 249 54.299 249 48.5Z"
            className="fill-[#F5F5F5] dark:fill-[#262626]"
          />
          <path
            d="M254 48.5C254 45.4624 256.462 43 259.5 43C262.538 43 265 45.4624 265 48.5C265 51.5376 262.538 54 259.5 54C256.462 54 254 51.5376 254 48.5Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <defs>
            <clipPath id="roundedCornersV">
              <rect
                x="21.25"
                y="19.25"
                width="389.5"
                height="843.5"
                rx="55.75"
                ry="55.75"
              />
            </clipPath>
          </defs>
        </>
      )}
    </svg>
  );
}
