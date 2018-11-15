using AutoMapper;
using BasketballSupercoach.API.Dtos;
using BasketballSupercoach.API.Models;

namespace BasketballSupercoach.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Player, PlayerForListDto>();
        }
    }
}