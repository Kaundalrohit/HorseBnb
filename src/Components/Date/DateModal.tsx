import { useState } from "react"

type props = {
    startTimeState: any
    setStartTimeState: (value: any) => void
    endTime: any,
    setEndTime: (value: any) => void

}


const DateModal = (props: props) => {
    const { startTimeState, setStartTimeState, endTime, setEndTime } = props

    const timeSlots = [
        { id: 1, time: "1 AM" },
        { id: 2, time: "2 AM" },
        { id: 3, time: "3 AM" },
        { id: 4, time: "4 AM" },
        { id: 5, time: "5 AM" },
        { id: 6, time: "6 AM" },
        { id: 7, time: "7 AM" },
        { id: 8, time: "8 AM" },
        { id: 9, time: "9 AM" },
        { id: 10, time: "10 AM" },
        { id: 11, time: "11 AM" },
        { id: 12, time: "12 AM" },
        { id: 13, time: "1 PM" },
        { id: 14, time: "2 PM" },
    ]

    setEndTime(startTimeState + 14)

    const [amPm, setAmPm] = useState<any>("")
    // const [date, setDate] = useState()

    const handleChange = (e: any) => {
        let timeNumber = parseInt((e.target.value).slice(0, 2))
        setStartTimeState(timeNumber)
        let AMPM = (e.target.value).slice(-2)
        setAmPm(AMPM)
    }


    let endTimeValue: any =
        (amPm === "AM" && endTime < 12) ? endTime + " AM" : (amPm === "AM" && endTime === 12) ? endTime + "PM" :
            (amPm === "AM" && endTime > 12) ? (endTime - 12) + "PM" : (amPm === "PM" && endTime < 12) ? endTime + " PM" : (amPm === "PM" && endTime === 12) ? endTime + "AM" :
                (amPm === "PM" && endTime > 12) ? (endTime - 12) + "AM" : "hi"
    return (
        <>
            <div className="modal fade" id="exampleModal7" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex">
                            <div className="row">

                                <select className="form-select" onChange={(e: any) => handleChange(e)} aria-label="Default select example">
                                    <option selected>Start Time</option>
                                    {timeSlots.map((e: any) => {
                                        return (
                                            <>
                                                <option value={e.time}>Select Time : {e.time}</option>
                                            </>
                                        )
                                    })}
                                </select>
                                <p>

                                </p>
                                <div className="endTime col-md-6">
                                </div>
                                <input type="input" name="endTime" id="endStallTime" value={endTimeValue} disabled />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DateModal