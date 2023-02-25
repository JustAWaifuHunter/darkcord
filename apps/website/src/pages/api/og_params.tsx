import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

const fonts = Promise.all([
  fetch(new URL("../../assets/fonts/Inter-Regular.ttf", import.meta.url)).then(
    async (res) => res.arrayBuffer(),
  ),
  fetch(new URL("../../assets/fonts/Inter-Bold.ttf", import.meta.url)).then(
    async (res) => res.arrayBuffer(),
  ),
]);

function DarkcordLogo() {
  return (
    <svg
      width="400"
      height="80"
      viewBox="0 0 1046 207"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M92.6667 1.66664C91.2 2.33331 82.4 4.99998 73.0667 7.53331C47.2 14.8666 42.4 17.2666 36.4 26.6C18.8 54.0666 6.53333 88.3333 1.99999 123C-5.72244e-06 138.333 -0.666672 165.133 0.799994 170.6C1.86666 174.6 18.8 185.4 39.3333 195.133C59.3333 204.733 66.8 207 70.1333 204.2C73.3333 201.667 81.3333 188.867 81.3333 186.467C81.3333 185.4 77.0667 182.2 71.7333 179.4C61.3333 173.933 59.7333 171.933 63.8667 169.667C66.1333 168.6 68.9333 169.133 78.2667 172.333C118.133 186.467 157.867 186.2 195.733 171.8C203.333 168.867 205.733 168.467 207.867 169.667C212.533 172.067 211.067 174.2 200.667 179.4C195.2 182.067 190.667 185.133 190.667 186.067C190.667 188.067 199.2 202.6 202 205.533C203.6 207.133 205.467 206.733 214.933 203C232.133 196.2 259.467 181.8 265.733 176.333L271.333 171.267L271.867 158.867C272.4 145 270.133 119.8 267.067 104.333C264.533 91.2667 256.933 67.6666 251.2 55.4C244.667 41 232.4 20.6 228.8 18.3333C224.8 15.6666 206.267 9.26664 188.8 4.33331C181.467 2.19998 175.333 0.599977 175.333 0.73331C175.333 0.866644 173.733 4.19998 171.867 8.06664L168.533 15.2666H136H103.333L100 7.79998C98.1333 3.79998 96.4 0.466644 96 0.466644C95.6 0.466644 94.1333 0.999977 92.6667 1.66664ZM96.1333 87.2667C110.8 92.2 118.8 107.533 114.667 122.733C112.933 129.533 105.067 138.6 99.0667 141.267C89.6 145.133 81.6 143 73.0667 134.067C67.0667 127.8 65.3333 123.533 65.3333 114.6C65.4667 102.333 72.6667 91.4 83.4667 87.6667C89.8667 85.4 90.5333 85.2667 96.1333 87.2667ZM187.067 87.1333C198.133 90.2 206.8 102.067 206.8 114.2C206.8 123.267 204 129.4 196.933 135.933C187.333 144.867 175.333 145.267 166.4 137.133C157.6 129.133 154.133 117.4 157.2 106.067C159.733 96.7333 171.467 86.6 180.667 85.8C181.467 85.6667 184.267 86.3333 187.067 87.1333Z"
        fill="white"
      />
      <path
        d="M613.333 107.667V153.667H628H642.667V142.333V130.867L652.4 142.2L662 153.533H676.8C689.067 153.667 691.867 153.267 692.533 151.667C693.067 150.2 688.667 143.8 680 133.133C672.667 124.2 666.667 116.467 666.667 116.067C666.667 115.667 672.4 110.733 679.333 105C686.4 99.2667 691.867 93.9333 691.6 93.1333C691.333 92.2 685.867 91.5333 676.8 91.2667L662.4 90.8667L652.533 98.3333L642.667 105.667V83.6667V61.6667H628H613.333V107.667Z"
        fill="white"
      />
      <path
        d="M1014.67 77.8C1014.67 92.6 1014.53 93.9333 1012.4 93C996.8 86.8667 974.667 90.4667 963.733 101C957.467 106.867 955.467 112.067 955.467 122.333C955.467 128.6 956.133 133 957.733 135.933C965.733 151 987.733 158.467 1006.4 152.6C1013.07 150.467 1014.67 150.333 1014.67 151.8C1014.67 153.267 1017.73 153.667 1030 153.667H1045.33V107.667V61.6667H1030H1014.67V77.8ZM1010.53 112.467C1014.53 113.933 1014.67 114.2 1014.67 121.667C1014.67 128.867 1014.4 129.4 1011.07 130.733C1000.8 134.733 991.067 133.133 986.267 126.733C978.933 117 995.467 107.267 1010.53 112.467Z"
        fill="white"
      />
      <path
        d="M333.333 111V153.933L367.733 153.4C399.867 152.867 402.533 152.6 410 149.667C424.667 143.933 431.467 137.667 436.667 125.4C438.933 119.8 439.333 106.067 437.333 98.8667C434 86.8667 423.467 76.8667 409.333 72.2C401.733 69.6667 396.8 69.2667 367.067 68.6L333.333 68.0667V111ZM395.467 93.5333C403.467 97.1333 406.667 101.933 406.667 110.2C406.667 124.067 398.8 130.067 378.4 131.8L366.667 132.733V111.8V91H378.4C386.8 91 391.467 91.8 395.467 93.5333Z"
        fill="white"
      />
      <path
        d="M468.4 91.6667C464.533 92.7333 459.333 94.4667 456.933 95.5333L452.267 97.4L453.733 103.667C454.933 109 455.467 109.8 457.867 109C465.6 106.733 478.667 104.333 483.333 104.333C489.6 104.333 497.867 108.067 498.4 111.267C498.8 113.267 498.267 113.267 493.733 112.067C486 109.933 466.933 111.533 458.8 115.133C449.733 119 446 124.2 446 133.267C446 139.4 446.533 140.733 450.533 144.867C457.6 152.067 464.8 154.333 481.333 154.333C492.133 154.333 496.4 153.8 500.133 151.933C504.4 149.8 505.333 149.8 509.467 151.533C514.133 153.4 520.667 154.2 529.733 153.8L534.667 153.667V144.467C534.667 135.267 534.667 135.133 531.067 134.733L527.333 134.333L526.667 120.067C525.867 103 524.4 100.2 512.667 94.3333C505.467 90.7333 503.333 90.3333 490 90.0667C480.267 89.8 472.933 90.3333 468.4 91.6667ZM495.067 127.133C499.067 128.2 500 129.133 500 131.8C500 134.067 498.933 135.4 496.533 136.333C491.2 138.467 480.533 137.933 478.133 135.533C475.2 132.733 475.467 131.667 479.467 128.467C483.467 125.4 487.6 125 495.067 127.133Z"
        fill="white"
      />
      <path
        d="M581.733 92.8667C574.933 96.0667 574.667 96.0667 574.667 93.6667C574.667 91.1333 573.6 91 558.667 91H542.667V122.333V153.667H558.933H575.067L574.267 136.2L573.467 118.867L577.733 116.2C583.6 112.733 591.6 112.867 595.6 116.6C597.333 118.2 598.933 119.133 599.333 118.733C600.4 117.667 605.333 91.8 604.533 91.1333C604.267 90.7333 600.533 90.3333 596.267 90.0667C590.267 89.6667 587.2 90.2 581.733 92.8667Z"
        fill="white"
      />
      <path
        d="M729.6 91.6667C713.867 95.1333 704.4 103 701.333 115.267C697.867 129.133 703.867 142.867 716.267 148.867C733.867 157.4 757.6 157 776 147.667C779.733 145.8 782.667 143.933 782.667 143.667C782.667 143.267 780.8 139.267 778.533 134.867C775.333 128.467 774 127 772.267 127.667C756 134.467 744.933 135.4 737.6 131C732 127.533 730.133 123.4 731.867 118.733C733.733 113.667 738.667 111 746.933 110.067C754.267 109.4 768 112.2 771.733 115.4C772.8 116.2 773.867 116.2 774.533 115.533C775.867 114.067 780 101.933 780 99.5333C780 98.7333 777.2 96.7333 773.733 95.2667C760 89.5333 745.2 88.3333 729.6 91.6667Z"
        fill="white"
      />
      <path
        d="M811.733 91.5333C802.667 94.2 794.667 100.067 791.067 107C788.4 112.067 788 114.6 788.267 123.267C788.8 136.733 792.933 143 805.467 149.4C813.067 153.4 815.867 153.933 827.467 154.6C854.933 156.067 871.067 147.533 874.933 129.267C878.267 113.533 871.333 99.9333 856.933 93.5333C851.2 91 847.333 90.3333 834 90.0667C823.733 89.9333 815.733 90.4667 811.733 91.5333ZM840.4 112.6C844.533 114.733 846.533 117.8 846.667 121.667C846.667 129.933 837.2 135.133 826.933 132.467C815.867 129.4 813.733 117.8 823.333 112.6C826.933 110.6 836.8 110.6 840.4 112.6Z"
        fill="white"
      />
      <path
        d="M926 91.8C923.067 92.8667 920.133 94.3333 919.467 95C917.333 97.1333 916 96.6 916 93.6667C916 91.1333 915.067 91 900.667 91H885.333V122.333V153.667H900.667H916V136.333V119L920.4 116.333C926 112.867 933.867 112.867 937.333 116.333C938.8 117.8 940.533 119 941.2 119C942.267 119 946.667 98.2 946.667 93.2667C946.667 92.2 945.733 90.8667 944.533 90.4667C940.933 89.1333 931.6 89.8 926 91.8Z"
        fill="white"
      />
    </svg>
  );
}

export default async function handler(req: NextRequest) {
  const fontData = await fonts;

  const { searchParams } = new URL(req.url);

  const hasName = searchParams.has("name");
  const hasDescription = searchParams.has("description");

  const name = hasName
    ? searchParams.get("name")!.slice(0, 100)
    : "Default Name";

  const description = hasDescription
    ? searchParams.get("description")!.slice(0, 100)
    : "Default description";

  return new ImageResponse(
    (
      <body
        style={{
          fontFamily: "Inter",
        }}
        tw="flex flex-row bg-[#181818] h-full w-full p-24"
      >
        <div tw="flex flex-col h-full">
          <div tw="flex flex-row text-4xl text-gray-400">
            <DarkcordLogo />
          </div>

          <h1 tw="ml-1 mt-58 text-white flex font-700 text-3xl leading-none">
            {name}
          </h1>

          <h2 tw="ml-1 mt-8 text-white text-xl flex opacity-50">
            {description}
          </h2>
        </div>
      </body>
    ),
    {
      width: 1078,
      height: 566,
      statusText: "OK",
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
      fonts: [
        { name: "Inter", data: fontData[0], weight: 500, style: "normal" },
        { name: "Inter", data: fontData[1], weight: 700, style: "normal" },
      ],
    },
  );
}

export const config = {
  runtime: "edge",
};