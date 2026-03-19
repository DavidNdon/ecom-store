export default function LoadingComponent() {
    return (
        <div className="flex items-center justify-center min-h-20">
            <div className="text-center">
                <div className="flex justify-center mb-2">
                    <span className="loading loading-spinner loading-sm text-primary"></span>
                </div>
                <h2 className="text-base font-semibold text-base-content mb-1">Loading</h2>
                <p className="text-xs text-base-content/70">Please wait...</p>
            </div>
        </div>
    );
}