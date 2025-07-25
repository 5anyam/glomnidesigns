import { IconPhoneOutgoing } from '@tabler/icons-react';
import Link from 'next/link';

function Callbutton() {
    return (
        
		<Link passHref href="tel:+919899989803"><div className="z-40 block lg:hidden" style={{position: 'fixed', bottom: 60, left: 36, cursor: 'pointer'}}>
        	<IconPhoneOutgoing target="_blank" style={{background: '#fde047',
			 color: 'white', zIndex: 9, height: 50, width: 50,
			 borderRadius: 99,
			 padding:'7px'}}/><span className="absolute right-0 top-0 rounded-full animate-ping w-full h-full ring-2 ring-yellow-300">
			 </span>
        	</div>
			</Link>
    )
}

export default Callbutton;