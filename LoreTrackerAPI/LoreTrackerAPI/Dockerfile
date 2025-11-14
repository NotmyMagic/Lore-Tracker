# Base runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://0.0.0.0:8080

# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy csproj and restore (relative path)
COPY LoreTrackerAPI.csproj ./
RUN dotnet restore "./LoreTrackerAPI.csproj"

# Copy all source code
COPY . ./

# Build the project
WORKDIR "/src/LoreTrackerAPI"
RUN dotnet build "./LoreTrackerAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
WORKDIR "/src/LoreTrackerAPI"
RUN dotnet publish "./LoreTrackerAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish ./
ENTRYPOINT ["dotnet", "LoreTrackerAPI.dll"]