import { HTMLAttributes } from 'react';

type IconProps = HTMLAttributes<SVGElement>;

export const Icons = {
	logo: (props: IconProps) => (
		<svg width="1075" height="192" viewBox="0 0 1075 192" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
			<path
				fillRule="evenodd"
				fill="currentColor"
				clipRule="evenodd"
				d="M0 17.921V35L5.25 35.084C8.138 35.131 13.123 35.496 16.329 35.896L22.157 36.623L24.699 31.561C26.097 28.778 27.328 26.396 27.435 26.268C28.022 25.571 49.215 31.457 57.411 34.594C66.934 38.239 67.005 38.292 71.053 44.701C88.98 73.087 98.776 109.483 96.535 139.377L95.845 148.577L87.673 153.87C78.303 159.939 64.782 166.612 54.222 170.38L46.945 172.977L42.604 166.238C40.217 162.532 37.274 157.546 36.065 155.158C34.084 151.248 33.599 150.885 31.183 151.502C23.854 153.375 14.733 154.965 7.75 155.586L0 156.276V174.138V192L32.25 191.974C78.73 191.937 87.885 190.743 104.5 182.55C119.208 175.298 129.326 163.605 134.761 147.578L137.5 139.5V97C137.5 50.056 137.375 48.893 130.831 35.113C126.337 25.649 114.985 14.485 104.976 9.686C89.473 2.252 85.446 1.728 40.25 1.259L0 0.841995V17.921ZM431 96.5V192H449H467V177.803V163.606L477.113 150.303C482.675 142.986 487.371 137 487.548 137C487.726 137 493.943 149.375 501.365 164.5L514.86 192H535.444H556.029L552.965 185.93C551.279 182.591 541.146 163.204 530.447 142.848L510.993 105.836L522.19 91.168C528.349 83.101 536.935 71.888 541.27 66.25L549.152 56H530.146H511.139L489.32 85.906L467.5 115.811L467.242 58.406L466.984 0.999995H448.992H431V96.5ZM1038.95 36.25C1038.9 69.29 1038.79 71.343 1037.25 69C1036.35 67.625 1033.3 64.196 1030.46 61.38C1023.84 54.797 1016.74 52 1006.64 52C988.975 52 975.774 60.443 968.489 76.403C962.922 88.6 962.5 91.814 962.5 122C962.5 151.952 963.1 156.396 968.71 168C976.744 184.616 995.49 194.21 1013.72 191.035C1023.99 189.247 1030.02 185.455 1035.9 177.1L1039 172.7V182.35V192H1057H1075V96.5V0.999995H1057H1039L1038.95 36.25ZM613.225 53.522C596.961 57.054 583.213 67.446 576.639 81.178C570.996 92.966 569.724 101.722 570.228 125.305C570.625 143.874 570.876 146.157 573.344 153.657C578.169 168.318 586.937 178.726 599.713 184.955C624.403 196.993 661.805 192.077 678.944 174.54L682.892 170.5L671.696 158.64L660.5 146.779L655.173 150.374C638.127 161.876 615.623 158.124 608.381 142.571C606.209 137.906 606.02 136.218 606.02 121.5C606.02 106.771 606.207 105.103 608.377 100.5C609.674 97.75 611.813 94.509 613.13 93.299C622.905 84.314 643.634 84.157 655.806 92.974L659.756 95.836L671.612 84.581L683.467 73.325L678.159 68.155C671.61 61.776 659.438 55.729 648.792 53.566C639.433 51.664 621.878 51.643 613.225 53.522ZM748.5 52.649C731.864 56.113 720.921 62.686 713.353 73.76C705.296 85.548 702.291 102.121 703.337 129C704.296 153.643 708.116 165.04 719.127 176.101C725.388 182.391 733.931 187.043 744 189.647C752.637 191.881 771.081 191.87 780.387 189.626C799.873 184.927 813.248 171.722 818.775 151.725C821.339 142.447 821.26 100.324 818.662 91.08C812.948 70.752 799.282 57.71 779.246 53.464C773.082 52.158 753.366 51.635 748.5 52.649ZM912.044 54.675C907.684 56.269 897.341 65.494 893.74 71C892.163 73.411 892.103 73.172 892.052 64.25L892 55H873H854V123.5V192H872.951H891.902L892.201 148.25C892.532 99.783 892.472 100.25 899.286 93.209C905.449 86.842 918.743 85.291 926.736 90.006C928.67 91.148 930.416 91.917 930.617 91.716C930.818 91.515 935.481 85.108 940.98 77.478L950.978 63.605L948.794 61.281C947.593 60.002 944.126 57.741 941.089 56.255C936.448 53.985 934.045 53.513 926.033 53.3C919.184 53.118 915.245 53.505 912.044 54.675ZM206.5 55.474C197.188 57.515 188.133 61.574 180.75 67.015C177.037 69.751 174 72.356 174 72.803C174 73.25 178.913 78.456 184.917 84.373L195.833 95.13L199.838 92.602C212.973 84.311 234.637 83.646 242.817 91.284C246.344 94.577 247.781 97.943 248.545 104.698L249.232 110.77L224.866 111.236C203.9 111.637 199.633 111.986 194.286 113.735C181.482 117.924 173.935 124.399 169.946 134.619C168.069 139.43 167.64 142.501 167.591 151.5C167.522 164.061 169.152 170.866 173.972 178.144C180.589 188.134 189.094 190.985 213.189 191.292C228.938 191.493 229.694 191.409 235.12 188.865C238.211 187.415 242.599 184.551 244.87 182.498L249 178.767V185.384V192H265H281L280.985 144.25C280.973 105.654 280.687 95.298 279.492 90.231C275.252 72.244 263.622 60.89 244.404 55.975C235.254 53.635 216.048 53.381 206.5 55.474ZM375.591 55.517C368.918 58.058 364.32 61.935 357.939 70.4L355 74.3V65.15V56H336H317V124V192H336H355V150.682C355 104.947 355.316 102.126 361.191 95.435C365.911 90.06 369.429 88.62 378 88.556C384.088 88.511 386.23 88.931 389.376 90.791C391.508 92.05 393.421 92.912 393.628 92.705C393.835 92.498 398.47 86.068 403.928 78.415L413.853 64.5L411.732 62.228C410.565 60.979 407.126 58.741 404.089 57.255C399.455 54.988 397.033 54.511 389.033 54.291C382.45 54.11 378.29 54.489 375.591 55.517ZM1029.09 87.287C1032.48 89.046 1034.15 90.837 1036.3 95.037L1039.1 100.5L1038.8 123C1038.47 148.136 1038.14 149.5 1031.36 154.674C1028.4 156.933 1026.46 157.522 1020.95 157.833C1012.25 158.325 1007.85 156.815 1003.63 151.886C998.442 145.82 997.802 142.008 998.173 119.356L998.5 99.336L1001.5 94.495C1007.18 85.325 1019.24 82.175 1029.09 87.287ZM774.345 89.249C779.02 91.83 782.528 96.532 784.081 102.301C784.726 104.696 785.024 113.358 784.824 123.9C784.524 139.751 784.272 141.91 782.289 145.624C777.76 154.108 770.438 157.615 759.131 156.717C750.923 156.065 745.509 152.52 742.039 145.526C739.828 141.068 739.538 139.039 739.183 125.532C738.957 116.919 739.262 107.959 739.897 104.549C741.649 95.151 747.007 89.057 755.431 86.881C760.412 85.594 769.869 86.778 774.345 89.249ZM24.5 89.871C17.808 94.027 14.986 99.072 15.022 106.815C15.098 123.122 31.58 131.699 43.004 121.378C55.409 110.17 48.44 87.992 32.518 88.004C29.368 88.006 26.383 88.701 24.5 89.871ZM248.944 145.25C248.826 158.24 245.155 161.92 230.188 164.044C220.481 165.422 212.502 164.758 206.415 162.065C201.4 159.847 199.667 157.068 199.753 151.382C199.833 146.124 201.279 143.411 205.314 140.95C208.191 139.196 210.463 139.007 228.75 139.004L249 139L248.944 145.25Z"
			/>
		</svg>
	),
};