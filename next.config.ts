import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
  images: {
	  remotePatterns: [
		  { protocol: 'https', hostname: 'res.cloudinary.com' },
		  {protocol: 'https', hostname: 'ftp.goit.study'}
	    ]
	},
	reactCompiler: true,
  
	// async headers() {
	// 	return [
	// 	{
	// 		source: '/',
	// 		locale: false,
	// 		headers: [
	// 		{
	// 			key: 'Cache-Control',
	// 			value: 'public, max-age=300, must-revalidate',
	// 		},
	// 		],
	// 	},
	// 	];
	// },
	};

export default nextConfig;
