import { useEffect } from "react"
import { Link } from "react-router-dom"
import checkCircleImg from '../Images/check-circle-primary.svg'
import errorImg from '../Images/error.png'


const CompletedSteps = (props: any) => {
    const { stepName, url, stepsArray, stepNumber, proImg } = props
    return (
        <>
            <div className="d-flex align-items-center justify-content-between ng-star-inserted">
                <p className="font-medium-bold text-black text-underline d-flex align-items-center cursor-pointer my-2" tabIndex={0} >
                    <img src={stepsArray.includes(stepNumber) || proImg ? (checkCircleImg) : (errorImg)} className="pr-2 ng-star-inserted pe-1" alt="" />
                    <Link to={`/${url}`}>{stepName}</Link>
                </p>
            </div>
        </>
    )
}
export default CompletedSteps