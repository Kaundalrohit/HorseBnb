import "./Search.css"
export default function Search() {

  const openCity: any = (evt: any, cityName: any) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    (document as any).getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  return (
    <>
      <div className="container mt-5 ">
        <div className="tab">
          <button className="tablinks active" onClick={(evt: any) => { openCity(evt, 'short') }}>Short Term Stalls</button>
          <button className="tablinks" onClick={(evt: any) => { openCity(evt, 'monthly') }}>Monthly Board</button>
          <button className="tablinks" onClick={(evt: any) => { openCity(evt, 'guest') }}>Guest Accommdations</button>
          <button className="tablinks" onClick={(evt: any) => { openCity(evt, 'horse') }}>Horse Adventures</button>
        </div>

        <div id="short" className="tabcontent active">
          <div className="search-stalls  mt-3">
            <div className="row justify-content-between p-4">
              <div className="col-md-3 col-lg-3 border-end">
                WHERE
                <div className="location">
                  Anywhere
                </div>
                <div className="search">
                  {/* <input id="searchTextField" type="text" size={50} placeholder="Anything you want!"></input> */}
                </div>
              </div>
              <div className="col-md-3 col-lg-3 border-end ">
                <div className="text-start">
                  CHECK-IN/CHECK-OUT
                </div>
                <div className="calender">
                  Add Dates
                </div>
              </div>

              <div className="col-md-3 col-lg-3">
                NUMBERS OF STALLS
                <div className="add-stalls">
                  Add Stalls
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="monthly" className="tabcontent">
          <div className="search-stalls  mt-3">
            <div className="row justify-content-between p-4">
              <div className="col-md-3 col-lg-3 border-end">
                WHERE
                <div className="location">
                  Anywhere
                </div>
                <div className="search">
                  {/* <input id="searchTextField" type="text" size={50} placeholder="Anything you want!"></input> */}
                </div>
              </div>
              <div className="col-md-3 col-lg-3 border-end ">
                <div className="text-start">
                  SELECT MONTH
                </div>
                <div className="calender">
                  Add Months
                </div>
              </div>

              <div className="col-md-3 col-lg-3">
                NUMBERS OF STALLS
                <div className="add-stalls">
                  Add Stalls
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="guest" className="tabcontent">
          <div className="search-stalls  mt-3">
            <div className="row justify-content-between p-4">
              <div className="col-md-3 col-lg-3 border-end">
                WHERE
                <div className="location">
                  Anywhere
                </div>
                <div className="search">
                  {/* <input id="searchTextField" type="text" size={50} placeholder="Anything you want!"></input> */}
                </div>
              </div>
              <div className="col-md-3 col-lg-3 border-end ">
                <div className="text-start">
                  CHECK-IN/CHECK-OUT
                </div>
                <div className="calender">
                  Add Dates
                </div>
              </div>

              <div className="col-md-3 col-lg-3">
                NUMBERS OF ROOMS
                <div className="add-stalls">
                  Add Rooms
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="horse" className="tabcontent">
          <div className="search-stalls  mt-3">
            <div className="row d-flex p-4">
              <div className="col-md-6 col-lg-3 border-end">
                WHERE
                <div className="location">
                  Anywhere
                </div>
                <div className="search">
                  {/* <input id="searchTextField" type="text" size={50} placeholder="Anything you want!"></input> */}
                </div>
              </div>
              <div className="col-md-6 justify-content-end col-lg-3">
                DATE
                <div className="add-stalls">
                  Add Date
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <...........................................................................> */}

      </div>
    </>
  );
}
