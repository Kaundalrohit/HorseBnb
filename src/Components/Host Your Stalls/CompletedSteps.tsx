import { Link } from "react-router-dom"

const CompletedSteps = (props: any) => {
    const { stepName, url, stepsArray, stepNumber } = props
    return (
        <>
            <div className="d-flex align-items-center justify-content-between ng-star-inserted">
                <p className="font-medium-bold text-black text-underline d-flex align-items-center cursor-pointer my-2" tabIndex={0} >
                    <img src={stepsArray.includes(stepNumber) ? ('https://horsebnb.com/assets/img/check-circle-primary.svg') : ("https://horsebnb.com/assets/img/error.png")} className="pr-2 ng-star-inserted pe-1" alt="" />
                    <Link to={`/${url}`}>{stepName}</Link>
                </p>
            </div>
        </>
    )
}
export default CompletedSteps