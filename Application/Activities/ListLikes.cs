using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class ListLikes
    {
        public class Query : IRequest<Result<int>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<int>>
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

            public async Task<Result<int>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = await _context.ActivityLikes
                .Where(d => d.Activity.Id == request.Id)
                .ToListAsync();

                return Result<int>.Success(query.Count);
            }
        }
    }
}