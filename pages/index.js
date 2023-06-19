import Layout from "../components/Layout"
import InputDates from '../components/EnterDates/InputDates';
import ConvertDate from "../components/DisplayDate/ConvertDate";

export default function Home() {
    return(
        <Layout>
            <InputDates/>
            <ConvertDate/>
        </Layout>
    )
}