using EdlerCareApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EdlerCareApi.Brokers
{
    public partial class StorageBroker: DbContext, IStorageBroker
    {
        private readonly IConfiguration configuration;
        private IHttpContextAccessor httpContextAccessor;

        public StorageBroker(
           IConfiguration configuration,
           IHttpContextAccessor httpContextAccessor)
        {
            this.configuration = configuration;
            this.httpContextAccessor = httpContextAccessor;

            //this.Database.Migrate();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionHost = configuration["DBPostgreSQL:ConnectionString:Host"];
            var connectionPort = configuration["DBPostgreSQL:ConnectionString:Port"];
            var connectionDatabase = configuration["DBPostgreSQL:ConnectionString:Database"];
            var connectionUsername = configuration["DBPostgreSQL:ConnectionString:Username"];
            var connectionPassword = configuration["DBPostgreSQL:ConnectionString:Password"];

            var connectionString
                = $"Host={connectionHost}:{connectionPort};Database={connectionDatabase}" +
                $";Username={connectionUsername};Password='{connectionPassword}'";
            optionsBuilder.UseNpgsql(connectionString, x => x.MigrationsHistoryTable("__MigrationsHistory", "Configuration"));
        }

        private async ValueTask<T> InsertAsync<T>(T @object)
        {
            var broker = new StorageBroker(this.configuration, this.httpContextAccessor);
            broker.Entry(@object).State = EntityState.Added;
            await broker.SaveChangesAsync();
            return @object;
        }

        private async ValueTask<T> SelectAsync<T>(params object[] objectIds) where T : class =>
            await FindAsync<T>(objectIds);

        private async ValueTask<T> SelectAsync<T, TRelatedEntity>(
            object objectIds, params object[] paramSet)
            where T : class
            where TRelatedEntity : class
        {
            var entity = await FindAsync<T>(objectIds);

            if (entity != null)
            {
                foreach (string param in paramSet)
                {
                    await Entry(entity).Reference(param).LoadAsync();
                }
            }
            return entity;
        }

        private async ValueTask<T> UpdateAsync<T>(T @object)
        {
            var broker = new StorageBroker(this.configuration, this.httpContextAccessor);
            broker.Entry(@object).State = EntityState.Modified;
            await broker.SaveChangesAsync();
            return @object;
        }

        private async ValueTask<T> DeleteAsync<T>(T @object)
        {
            var broker = new StorageBroker(this.configuration, this.httpContextAccessor);
            broker.Entry(@object).State = EntityState.Deleted;
            await broker.SaveChangesAsync();
            return @object;
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            DateTimeOffset dateTime = DateTimeOffset.UtcNow;
            string userId = this.httpContextAccessor.HttpContext?
                .User?.Claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                ?.Value;
            Console.WriteLine($"Captured UserId {userId}");
            if (userId != null)
            {
                SetAuditOnCreate(dateTime, new Guid(userId));
                SetAuditOnModify(dateTime, new Guid(userId));
            }
            return base.SaveChangesAsync(cancellationToken);
        }

        private void SetAuditOnCreate(DateTimeOffset dateTime, Guid userId)
        {
            var insertedEntries = this.ChangeTracker.Entries()
                                   .Where(x => x.State == EntityState.Added)
                                   .Select(x => x.Entity);

            foreach (var insertedEntry in insertedEntries)
            {
                var auditableEntity = insertedEntry as IAuditable;
                if (auditableEntity != null)
                {
                    auditableEntity.CreatedDate = dateTime;
                    auditableEntity.CreatedBy = userId;
                    auditableEntity.UpdatedDate = dateTime;
                    auditableEntity.UpdatedBy = userId;
                }
            }
        }

        private void SetAuditOnModify(DateTimeOffset dateTime, Guid userId)
        {
            var modifiedEntries = this.ChangeTracker.Entries()
                       .Where(x => x.State == EntityState.Modified)
                       .Select(x => x.Entity);

            foreach (var modifiedEntry in modifiedEntries)
            {
                var auditableEntity = modifiedEntry as IAuditable;
                if (auditableEntity != null)
                {
                    auditableEntity.UpdatedDate = dateTime;
                    auditableEntity.UpdatedBy = userId;
                }
            }
        }


    }
}