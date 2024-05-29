
"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { doc, getFirestore, setDoc , collection , query, orderBy, startAt , getDocs } from "firebase/firestore";
import { HiSearch,HiBell,HiChat } from "react-icons/hi";
import app from './../Shared/firebaseConfig'
import { useRouter } from 'next/navigation';
import { FaMoon, FaSun } from 'react-icons/fa';
function Header() {
  const { data: session } = useSession();
  const router=useRouter();
  const db = getFirestore(app);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState('light');

  useEffect(()=>{
    saveUserInfo();
  },[session])
  useEffect(() => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
  }, [theme]);
  const saveUserInfo=async()=>{
    if(session?.user)
    {
      await setDoc(doc(db, "user", session.user.email), {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image
      });
    }
  }
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async (event) => {
    event.preventDefault();
    // Fetch data from Firebase based on the searchTerm value
    const q = query(collection(db, "pinterest-post"), orderBy("title", "desc"), startAt(searchTerm));
    const querySnapshot = await getDocs(q);
    const results =[];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    setSearchResults(results);
  };

  const onCreateClick=()=>{
    if(session)
    {
      router.push('/pin-builder')
    }
    else{
      signIn()
    }
  }

  
  return (
    <div className='flex justify-between 
     gap-3 md:gap-2 items-center p-6 '>
        <Image src='/logo.png' alt='logo'
        width={60} height={60} onClick={()=>router.push('/')}
        className='hover:bg-gray-300 p-2
        rounded-full cursor-pointer'/>
        <button className='bg-[#C21E56]
         text-white p-3 px-6 rounded-full
         text-[25px]
          hidden md:block' onClick={()=>router.push('/')}>Home</button>
        <button className='font-semibold text-[#C21E56] p-3 px-6
         rounded-full text-[25px]' 
         onClick={()=>onCreateClick()}>Create</button>
        <div className='bg-[#C21E56] p-3 px-6
         gap-3 items-center rounded-full w-full hidden md:flex'>
        <HiSearch className='text-[34px] 
        text-gray-500'/>
        <form onSubmit={handleSearch}>
          <input type="text" placeholder='CHOOSE YOUR OUTFIT'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='bg-[#C21E56] outline-none w-full text-[25px] text-white' />
        </form>
        </div>
        <HiSearch className='text-[25px] 
        text-gray-500 md:hidden'/>
        {searchResults.length > 0 && (
  <div className="absolute bg-white mt-2 w-full z-10 shadow-md">
    {searchResults.map((post) => (
      <div key={post.id} className="flex items-center p-4 border-b">
        <Image src={post.image} alt={post.title} width={50} height={50} className="rounded" />
        <div className="ml-4">
          <p className="text-sm font-semibold">{post.title}</p>
        </div>
      </div>
    ))}
  </div>
)}
<button className='bg-[#C21E56]
         text-white p-3 px-6 rounded-full
         text-[25px]' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
         {theme === 'light' ? <FaMoon /> : <FaSun />}
       </button>
      {session?.user?  
      <Image src={session.user.image} 
       onClick={()=>router.push('/'+ session.user.email)}
      alt='user-image' width={60} height={60}
        className='hover:bg-gray-300 p-2
        rounded-full cursor-pointer'/>:

        <button className='font-semibold p-2 px-4 rounded-full'
         onClick={() => signIn()}>Login</button>}



    </div>
  )
}

export default Header