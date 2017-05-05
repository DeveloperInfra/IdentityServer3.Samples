namespace IdentityServer.Config
{
    using IdentityServer3.Core.Models;
    using System.Collections.Generic;

    public static class Clients
    {
        public static IEnumerable<Client> Get()
        {
            return new[]
            {
                new Client
                {
                    Enabled = true,
                    ClientName = "JS Client",
                    ClientId = "js",
                    Flow = Flows.Implicit,

                    RedirectUris = new List<string>
                    {
                        "http://localhost:56668/popup.html",
                        "http://localhost:56668/silent-renew.html"
                    },

                    PostLogoutRedirectUris = new List<string>
                    {
                        "http://localhost:56668/index.html"
                    },

                    AllowedCorsOrigins = new List<string>
                    {
                        "http://localhost:56668"
                    },

                    AllowAccessToAllScopes = true,
                    AccessTokenLifetime = 60
                },
                new Client
                {
                    Enabled = true,
                    ClientName = "Angular 1 Client",
                    ClientId = "ng1",
                    Flow = Flows.Implicit,

                    RedirectUris = new List<string>
                    {
                        "https://localhost:3000/popup.html",
                        "https://localhost:3000/silentrenew.html"
                    },

                    PostLogoutRedirectUris = new List<string>
                    {
                        "https://localhost:3000/index.html"
                    },

                    AllowedCorsOrigins = new List<string>
                    {
                        "https://localhost:3000"
                    },

                    AllowAccessToAllScopes = true,
                    AccessTokenLifetime = 60
                },
                new Client
                {
                    Enabled = true,
                    ClientName = "Angular 4 Client",
                    ClientId = "ng4",
                    Flow = Flows.Implicit,

                    RedirectUris = new List<string>
                    {
                        "https://localhost:4200/popup.html",
                        "https://localhost:4200/silentrenew.html"
                    },

                    PostLogoutRedirectUris = new List<string>
                    {
                        "https://localhost:4200/index.html"
                    },

                    AllowedCorsOrigins = new List<string>
                    {
                        "https://localhost:4200"
                    },

                    AllowAccessToAllScopes = true,
                    AccessTokenLifetime = 60
                }
            };
        }
    }
}