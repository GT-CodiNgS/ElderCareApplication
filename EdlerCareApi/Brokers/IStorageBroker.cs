namespace EdlerCareApi.Brokers
{
    public partial interface IStorageBroker
    {
        Guid GetLoggedUserId();
    }
}