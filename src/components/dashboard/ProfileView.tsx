import type { User } from "../../types";

interface ProfileViewProps {
    user: User;
}

const ProfileView = ({ user }: ProfileViewProps) => {
    return (
        <div className="p-4">
            <div className="card bg-base-100 shadow-xl border border-base-300 mb-6">
                <div className="card-body items-center text-center p-8">
                    <div className="avatar placeholder mb-4">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-400 ring ring-base-100 ring-offset-base-100 ring-offset-4 flex items-center justify-center">
                            <span className="text-white text-4xl font-bold">
                                {user.name.charAt(0)}
                            </span>
                        </div>
                    </div>
                    <h2 className="card-title text-2xl text-base-content">
                        {user.name}
                    </h2>
                    <p className="text-sm text-base-content opacity-70 mb-4">
                        {user.email}
                    </p>
                    <div className="badge badge-warning badge-lg font-bold">
                        Gold Member
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body p-5">
                    <div className="flex justify-between items-center py-3">
                        <span className="text-base-content opacity-70">
                            Home Club
                        </span>
                        <span className="font-bold text-base-content">
                            {user.homeClub}
                        </span>
                    </div>
                    <div className="divider my-0"></div>
                    <div className="flex justify-between items-center py-3">
                        <span className="text-base-content opacity-70">
                            Total Points
                        </span>
                        <span className="badge badge-success badge-lg font-bold">
                            {user.totalPoints}
                        </span>
                    </div>
                    <div className="divider my-0"></div>
                    <div className="flex justify-between items-center py-3">
                        <span className="text-base-content opacity-70">
                            Member Since
                        </span>
                        <span className="font-bold text-base-content">
                            Oct 2024
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
