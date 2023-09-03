export default function Cards() {
  return (
    <>
      <div className="bg-color-blue-nav-active">
        {" "}
        <h2 className="color-white font-size36-md font-size32 font-weight800">
          For Business
        </h2>{" "}
        <p className="font-size18-md font-size16 font-weight400">
          One solution for developing cybersecurity{" "}
          <br className="d-none d-lg-block" /> skills across your entire IT team
        </p>{" "}
        <div className="d-flex justify-content-center align-items-center pb-4">
          {" "}
          <span className="color-white font-size18 font-weight600 mr-2 sub">
            Get a Demo
          </span>{" "}
          <svg
            className="arrow-icon "
            width={16}
            height={16}
            viewBox="0 -3 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <path
              className="arrow-icon-right"
              fill="#ffffff"
              d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"
            >
              {" "}
            </path>{" "}
            <path
              className="arrow-icon-stem"
              stroke="#ffffff"
              d="M1.75 8H11"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {" "}
            </path>{" "}
          </svg>{" "}
        </div>{" "}
      </div>
    </>
  );
}
