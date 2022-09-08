import useAuth from "@components/hooks/useAuth";
import { Fragment } from "react";

function Profile() {
  const { user, loading } = useAuth();

  return (
    <Fragment>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl py-12 sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {user && (loading ? 'Loading...' : user.email)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Profile;