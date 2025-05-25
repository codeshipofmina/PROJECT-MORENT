import "../styles/test_user_notice.css";

export const TestUserNotice = () => {
  return (
    <div className="test-user-box">
      <h2 className="test-user-title">
        Create your own Account or <br /> Login with:
      </h2>
      <p className="test-user-info">
        In this account, some bookings have already been stored. <br />
        To view all the details, you can either check this account <br />
        or alternatively create your own account to make and <br />
        manage your bookings.
      </p>
      <p className="credentials">
        Email: <span>a@admin.com</span> <br />
        Password: <span>123456</span>
      </p>
    </div>
  );
};
