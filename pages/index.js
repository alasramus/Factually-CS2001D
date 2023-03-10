import { prisma } from '../db'
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from '../components/layout'
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import stars from '../components/stars';


export default function Home({data, actv}) {
  const {data: session, status} = useSession();
  const router = useRouter();
  
 
  if (status === "authenticated"){
    const experience = session.user.exp
    const level = session.user.level
    return (
      <>
        <div>
        <h1 className="mb-4 px-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-400 from-indigo-800">Factually</span></h1>
        <div className="lg:max-h-screen p-4 flex flex-col-reverse lg:flex-row justify-evenly gap-4">
          <div className="grow max-w-6xl h-screen bg-white">
            
            {actv.map(item => (
              
              <div class="flex justify-center">
              <div class="rounded-lg shadow-lg bg-white max-w-sm">
                <a href="#!">
                  <img class="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt=""/>
                </a>
                <div class="p-6">
                  <h5 class="text-gray-900 text-xl font-medium mb-2">Card title</h5>
                  <p class="text-gray-700 text-base mb-4">
                    Some quick example text to build on the card title and make up the bulk of the card's
                    content.
                  </p>
                  <stars
                  rating = {1}
                  
                  />
                  <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
                </div>
              </div>
            </div>
            ))}
                          
          </div>
  
          <div className="">
            <div className="grid grid-row">
            <div className="flex flex-col py-5 items-center">
              <p className="text-2xl text-black font-extrabold mb-5">Current Level</p>
              <div className="flex flex-row items-center divide-x-2 divide-red-500 mb-5">
                <p className="text-lg text-black font-extrabold">Level {level}</p>
              </div>
              <div className="radial-progress bg-green-500 text-primary-content font-bold text-3xl border-4 border-green-500" style={{"--value":level, "--size": "12rem"}}>{experience}/100</div>
            </div>
          </div>
  
          <div className="bg-white rounded-lg border-slate-400 border-2 text-black text-sm">
            <div className="flex flex-col p-5 divide-y border-gray-300">
              <div className="flex items-center justify-between space-x-6 p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col space-y-2">
                    <p>Mission 1</p>
                    <p>Aliquam tincidunt mauris eu risus.</p>
                  </div>
                </div>
                <div>
                  <p>0/5</p>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-6 p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col space-y-2">
                    <p>Mission 2</p>
                    <p>Aliquam tincidunt mauris eu risus.</p>
                  </div>
                </div>
                <div>
                  <p>0/5</p>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-6 p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col space-y-2">
                    <p>Mission 3</p>
                    <p>Aliquam tincidunt mauris eu risus.</p>
                  </div>
                </div>
                <div>
                  <p>0/5</p>
                </div>
              </div>
              <Link href="/achievements">
              <div>
                <button className="w-full bg-red-500 text-white rounded-md border p-2 transition hover:opacity-60">View all</button>
              </div>
              </Link>
            </div>
          </div>
            </div>
            
         
  
        </div>
        </div>
        
      </>
    );
    
  }
  
}

export async function getServerSideProps(context) {
  
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signIn',
        permanent: false,
      },
    }
  }

  const actv = await prisma.activities.findMany({
    orderBy: [{
      aid: 'asc'
    }]
  })

  


  return {
    props: {
      actv
    }
  }
}


Home.getLayout = function getLayout(page) {
  return (
      <Layout>
      {page}
      </Layout>
  )
  }