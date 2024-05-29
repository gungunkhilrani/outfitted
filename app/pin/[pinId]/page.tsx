"use client"
import React, { useEffect, useState } from 'react'
import PinImage from './../../components/PinDetail/PinImage'
import PinInfo from './../../components/PinDetail/PinInfo'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import app from '@/app/Shared/firebaseConfig'
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useRouter } from 'next/navigation'
import userInfo from './../../[userId]/page'
import  UserInfo from  './../../components/UserInfo'

function PinDetail({params}) {
  const router=useRouter();
  const db=getFirestore(app);
  const [pinDetail,setPinDetail]=useState([]);
  useEffect(()=>{
    getPinDetail();
  },[])
 const getPinDetail=async()=>{
      const docRef = doc(db, 'pinterest-post',params.pinId );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
       
        setPinDetail(docSnap.data())
      } else {
       
        console.log("No such document!");
      }
  }
  return (
    <div>
      {userInfo?
      <UserInfo userInfo={userInfo}/>:null}
    </div>
  )
}

export default PinDetail