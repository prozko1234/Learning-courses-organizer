using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Chats;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Chats
{
    public class List
    {
        public class Query : IRequest<Result<List<ChatDto>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<ChatDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ChatDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var username = _userAccessor.GetUsername();
                var user = await _context.Users.Where(x => x.UserName == username).FirstOrDefaultAsync();
                var chats = await _context.Chats
                    .Where(x => x.User.Id == user.Id || x.SecondUser.Id == user.Id)
                    .OrderByDescending(x => x.LastMessageDate)
                    .ProjectTo<ChatDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<ChatDto>>.Success(chats);
            }
        }
    }
}