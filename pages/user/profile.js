import useAuth from "@components/hooks/useAuth";

function Profile() {
  const { user, loading } = useAuth();

  return (
    <>
      <h1>Dashboard</h1>
      <p>User Profile</p>
      {user && (loading ? 'Loading...' : user.email)}
    </>
  );
}

export default Profile;