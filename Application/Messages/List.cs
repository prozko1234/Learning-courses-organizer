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

namespace Application.Messages
{
    public class List
    {
        public class Query : IRequest<Result<List<MessageDto>>>
        {
            public Guid ChatId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<MessageDto>>>
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

            public async Task<Result<List<MessageDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var chatId = request.ChatId;
                var messages = await _context.Messages
                    .Where(x => x.Chat.Id == chatId)
                    .OrderBy(x => x.Date)
                    .ProjectTo<MessageDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<MessageDto>>.Success(messages);
            }
        }
    }
}