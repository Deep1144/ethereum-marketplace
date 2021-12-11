
import { Hero } from "@components/ui/common"
import { CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"
import { useWeb3 } from "@components/providers"

export default function Home({ courses }) {
  const { isLoading, web3 } = useWeb3()
  return (
    <>
      {/* {isLoading ? "Loading..." : web3 ? "Detected Web3" : "install metamask"} */}
      <Hero />
      <CourseList
        courses={courses}
      />
    </>
  )
}

export function getStaticProps() {
  const { data } = getAllCourses()
  return {
    props: {
      courses: data
    }
  }
}

Home.Layout = BaseLayout
