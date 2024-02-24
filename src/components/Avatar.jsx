import profileDummy from '../assets/profileDummy.jpg'

const Avatar = ({img,width}) => {
  return (
    <>
        <img src={img || profileDummy} className='rounded-full' alt="" width={width} />
    </>
  )
}

export default Avatar