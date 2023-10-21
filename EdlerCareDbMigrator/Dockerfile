FROM mcr.microsoft.com/dotnet/sdk:7.0

# Install the dotnet-ef tool globally
RUN dotnet tool install --global dotnet-ef

# Update the PATH environment variable
ENV PATH="${PATH}:/root/.dotnet/tools"

# The rest of your Dockerfile...
