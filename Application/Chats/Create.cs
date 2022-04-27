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
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Chats
{
    public class Create
    {
        public class Command : IRequest<Result<ChatDto>>
        {
            public string SecondUsername { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.SecondUsername).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<ChatDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<ChatDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Where(x => x.UserName == _userAccessor.GetUsername()).Include(x => x.Photos).FirstOrDefaultAsync();
                var secondUser = await _context.Users.Where(x => x.UserName == request.SecondUsername).Include(x => x.Photos).FirstOrDefaultAsync();

                if (user == null || secondUser == null) return null;

                var chat = new Chat
                {
                    User = user,
                    SecondUser = secondUser,
                };
                _context.Chats.Add(chat);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<ChatDto>.Success(_mapper.Map<ChatDto>(_mapper.Map<Chat, ChatDto>(chat)));

                return Result<ChatDto>.Failure("Failde to add chat.");
            }
        }
    }
}